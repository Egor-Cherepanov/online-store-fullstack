const Cart = require("../models/Cart")

async function addToCart(userId, productId, quantity = 1, size) {
  const existing = await Cart.findOne({
    author: userId,
    product: productId,
    size,
  })

  if (existing) {
    existing.quantity += quantity
    return await existing.save()
  }

  return await Cart.create({
    author: userId,
    product: productId,
    quantity,
    size,
  })
}

async function getCart(userId) {
  return await Cart.find({ author: userId }).populate("product")
}

async function updateCartItem(userId, productId, quantity) {
  return await Cart.findOneAndUpdate(
    { author: userId, product: productId },
    { quantity },
    { new: true }
  )
}

async function removeFromCart(userId, productId) {
  return await Cart.deleteOne({ author: userId, product: productId })
}

async function clearCart(userId) {
  return await Cart.deleteMany({ author: userId })
}

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
}
