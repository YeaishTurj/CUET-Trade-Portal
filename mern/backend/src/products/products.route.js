const express = require("express");
const Product = require("./products.model");
const veryfyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

// post a product
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
    });

    const savedProduct = await newProduct.save();
    res.status(201).send(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// get all products
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

// get a product by id
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      "postedBy",
      "email fullName profileImage contactNumber"
    );
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// update a product
router.patch("/update-product/:id", veryfyToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id; // From verifyToken middleware
    const isAdmin = req.user.role === "admin";

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Only allow if user is admin or posted the product
    if (!isAdmin && product.postedBy.toString() !== userId) {
      return res
        .status(403)
        .send({ message: "Unauthorized to update this product" });
    }

    Object.assign(product, req.body); // Apply updates
    const updatedProduct = await product.save();

    res.status(200).send({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// delete a product
router.delete("/:id", veryfyToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user._id; // From verifyToken
    const isAdmin = req.user.role === "admin";

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    if (!isAdmin && product.postedBy.toString() !== userId) {
      return res
        .status(403)
        .send({ message: "Unauthorized to delete this product" });
    }

    await product.deleteOne();
    res.status(200).send({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
