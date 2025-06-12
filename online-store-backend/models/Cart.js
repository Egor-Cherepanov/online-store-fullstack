const mongoose = require("mongoose")

const CartSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Cart = mongoose.model("Cart", CartSchema)
module.exports = Cart
