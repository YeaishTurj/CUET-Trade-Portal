const express = require("express");
const router = express.Router();
const Order = require("./orders.model");

// ✅ Place Order via Cash on Delivery
router.post("/place-order", async (req, res) => {
  try {
    const {
      userId,
      products,
      amount,
      email,
      shippingAddress,
      deliveryOption, // "collect_from_seller" or "home_delivery"
    } = req.body;

    const deliveryCharge = deliveryOption === "home_delivery" ? 50 : 0;
    const totalAmount = amount + deliveryCharge;

    const order = new Order({
      orderId: `COD-${Date.now()}`,
      userId,
      products,
      amount: totalAmount,
      email,
      shippingAddress,
      deliveryOption,
      deliveryCharge,
      status: "pending",
      paymentStatus: "unpaid",
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing COD order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// (Optional) ✅ Get all orders for admin
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// (Optional) ✅ Get orders by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
