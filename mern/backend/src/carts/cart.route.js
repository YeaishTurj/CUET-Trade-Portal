const express = require("express");
const router = express.Router();
const Cart = require("./cart.model");
const verifyToken = require("../middleware/verifyToken");

// 🛒 Get cart for signed-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );

    res.status(200).send(cart || { user: req.user._id, products: [] });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 🛒 Add/update product in cart
router.post("/", verifyToken, async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    const existingItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 🗑️ Remove a product from cart
router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// 🧹 Clear entire cart
router.delete("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.products = [];
      await cart.save();
    }

    res.status(200).send({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
