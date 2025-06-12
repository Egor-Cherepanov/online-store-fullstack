const mongoose = require("mongoose")
const validator = require("validator")

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    male: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Image should a valid URL",
      },
    },
    content: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product
