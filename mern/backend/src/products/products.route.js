const express = require("express");
const Product = require("./products.model");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// ✅ Create Product (must be authenticated)
router.post("/create-product", verifyToken, async (req, res) => {
  try {
    const { _id, role } = req.user;
    const userContact = req.body.contact; // Optional override

    const newProduct = new Product({
      ...req.body,
      postedBy: _id,
      contact: userContact || req.user.contactNumber,
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

module.exports = router;
