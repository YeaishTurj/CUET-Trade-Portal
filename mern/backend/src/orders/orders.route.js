const express = require("express");
const router = express.Router();
const Order = require("./orders.model");
const verifyToken = require("../middleware/verifyToken");

router.post("/create-order/:id", async (req, res) => {
  const { id } = req.params; // Extract the userId from the URL parameter
  const {
    products,
    totalPrice,
    deliveryOption,
    email,
    amount,
    deliveryCharge,
    shippingAddress,
  } = req.body;

  // Validate required fields
  if (!email || !amount) {
    return res.status(400).json({ message: "Email and Amount are required." });
  }

  try {
    // Create a new order with the userId from the URL
    const order = new Order({
      userId: id, // Use the userId passed in the URL
      products,
      totalPrice: totalPrice + deliveryCharge, // Total price including delivery charge
      deliveryOption,
      email,
      amount, // The final total price
      deliveryCharge,
      shippingAddress:
        deliveryOption === "home_delivery" ? shippingAddress : "", // Only set if home_delivery
      status: "pending", // Default status
      orderId: `ORDER-${Date.now()}`, // Generate a unique order ID
    });

    // Save the order to the database
    await order.save();

    // Return the success response
    res.status(200).json({
      message: "Order created successfully",
      orderId: order.orderId,
    });
  } catch (err) {
    // Return error response
    console.error(err);
    res.status(500).json({ message: "Error creating order", error: err.message });
  }
});

module.exports = router;
