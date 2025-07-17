const express = require("express");
const Product = require("./products.model");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();


// ✅ Create Product (must be authenticated)
router.post("/create-product", verifyToken, async (req, res) => {
  try {
    const { _id } = req.user;
    const { contact, endsIn, category } = req.body;

    // Function to convert "2d 4h 5m" → actual Date
    const parseEndsInToDate = (endsInStr) => {
      const matches = endsInStr?.match(/\d+[dhms]/g) || [];
      const msMap = { d: 86400000, h: 3600000, m: 60000, s: 1000 };
      let totalMs = 0;

      for (const part of matches) {
        const unit = part.slice(-1);
        const value = parseInt(part.slice(0, -1), 10);
        totalMs += value * (msMap[unit] || 0);
      }

      return new Date(Date.now() + totalMs);
    };

    let expiresAt = undefined;
    if (category === "pre-owned" && endsIn) {
      expiresAt = parseEndsInToDate(endsIn);
    }

    const newProduct = new Product({
      ...req.body,
      postedBy: _id,
      contact: contact || req.user.contactNumber,
      expiresAt,
    });

    const savedProduct = await newProduct.save();
    res.status(201).send(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});


// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate(
      "postedBy",
      "fullName profileImage"
    );
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// ✅ Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "postedBy",
      "email fullName profileImage contactNumber"
    );
    if (!product) return res.status(404).send({ message: "Product not found" });
    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// ✅ Update product (only postedBy or admin)
router.patch("/update-product/:id", verifyToken, async (req, res) => {
  try {
    const { _id: userId, role } = req.user;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send({ message: "Product not found" });
    if (role !== "admin" && product.postedBy.toString() !== userId) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res
      .status(200)
      .send({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// ✅ Delete product (only postedBy or admin)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { _id: userId, role } = req.user;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send({ message: "Product not found" });
    if (role !== "admin" && product.postedBy.toString() !== userId) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    await product.deleteOne();
    res.status(200).send({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 🔒 Place a bid on pre-owned product
router.post("/place-bid/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { biddingPrice } = req.body;

    if (!product) return res.status(404).send({ message: "Product not found" });
    if (product.category !== "pre-owned")
      return res.status(400).send({ message: "Not a pre-owned product" });

    // ⏰ Check expiry
    if (product.expiresAt && new Date() > new Date(product.expiresAt)) {
      return res.status(403).send({ message: "Auction has expired" });
    }

    // 💵 Validate bid amount
    if (!biddingPrice || biddingPrice <= 0) {
      return res.status(400).send({ message: "Invalid bidding price" });
    }

    // 📌 Save bid
    product.bids.push({
      user: req.user._id,
      biddingPrice,
    });

    await product.save();

    res.status(200).send({ message: "Bid placed", product });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});


module.exports = router;
