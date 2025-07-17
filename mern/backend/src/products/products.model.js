const { Schema, model, Types } = require("mongoose");
const User = require("../users/user.model"); // Make sure the path is correct

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "fashion",
        "electronics",
        "digital",
        "others",
        "pre-owned",
        "lost",
        "found",
      ],
    },
    description: { type: String, required: true },
    imageURL: {
      type: String,
      required: function () {
        return this.category !== "lost" && this.category !== "found";
      },
    },
    price: { type: Number },
    perWhich: {
      type: String,
      enum: ["piece", "month", "hour", "day", "week", "year", "other"],
    },
    features: { type: [String], default: [] },
    availableSizes: { type: [String], default: [] },
    bids: {
      type: [
        {
          user: { type: String },
          biddingPrice: { type: Number },
        },
      ],
      default: [],
    },
    endsIn: { type: String },
    expiresAt: {
      type: Date,
    },

    location: { type: String },
    postedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    contact: {
      type: String, // auto-filled from User model
    },
  },
  { timestamps: true }
);

// 🔁 Auto-fill `contact` from user's contactNumber before validation
productSchema.pre("validate", async function (next) {
  if (!this.contact && this.postedBy) {
    try {
      const user = await User.findById(this.postedBy);
      if (user) {
        this.contact = user.contactNumber || "";
      }
    } catch (err) {
      console.error("Failed to auto-fill contact from user:", err);
    }
  }
  next();
});

const Product = model("Product", productSchema);

module.exports = Product;
