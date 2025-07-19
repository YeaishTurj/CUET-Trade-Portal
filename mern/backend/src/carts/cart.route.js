// routes/cart.routes.js
const express = require("express");
const router = express.Router();
const Cart = require("./cart.model");
const verifyToken = require("../middleware/verifyToken");

// 🔁 Add item to cart
router.post("/add", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1, price } = req.body; // Including price in the request body

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = price; // Update price if item exists
    } else {
      cart.items.push({ product: productId, quantity, price }); // Add price when adding a new item
    }

    await cart.save();
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

// 🔁 Get cart items
// Fetch cart with populated product details
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: "items.product", // populate the 'product' field inside items
        select: "title price imageURL", // only select relevant fields
      })
      .exec();
    res.status(200).send(cart || { user: userId, items: [] });
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

// 🔁 Remove item
// DELETE /api/cart/remove/:productId
router.delete("/remove/:productId", verifyToken, async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { product: req.params.productId } } },
    { new: true }
  );
  res.status(200).json(cart);
});

// PATCH /api/cart/update
router.patch("/update", verifyToken, async (req, res) => {
  const { productId, quantity, price } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).send({ message: "Item not found in cart" });
    }

    // Ensure quantity is positive
    if (quantity <= 0) {
      return res
        .status(400)
        .send({ message: "Quantity must be greater than zero" });
    }

    item.quantity = quantity;
    item.price = price; // Update price when updating the quantity

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

// PATCH /api/update-cart/:id
router.patch("/update-cart/:id", verifyToken, async (req, res) => {
  const userId = req.params.id;
  const { cartItems } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    // Replace the cart items with the new items from the request
    cart.items = cartItems;

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).send({ message: "Server error", error: err.message });
  }
});

// DELETE /api/cart/clear
router.delete("/clear", verifyToken, async (req, res) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { items: [] },
    { new: true }
  );
  res.status(200).json(cart);
});

module.exports = router;
