const mongoose = require("mongoose")

module.exports = function (product) {
  return {
    id: product.id,
    title: product.title,
    male: product.male,
    category: product.category,
    quantity: product.quantity,
    image: product.image,
    content: product.content,
    price: product.price,
    createdAt: product.createdAt,
  }
}
