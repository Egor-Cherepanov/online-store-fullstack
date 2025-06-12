const express = require("express")
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart")
const authenticated = require("../middlewares/authenticated")

const router = express.Router({ mergeParams: true })

// Получить корзину текущего пользователя
router.get("/", authenticated, async (req, res) => {
  const items = await getCart(req.user.id)
  res.send({ data: items })
})

// Добавить товар в корзину
router.post("/", authenticated, async (req, res) => {
  const item = await addToCart(
    req.user.id,
    req.body.productId,
    req.body.quantity || 1,
    req.body.size
  )
  res.send({ data: item })
})

// Изменить количество
router.patch("/:productId", authenticated, async (req, res) => {
  const updated = await updateCartItem(
    req.user.id,
    req.params.productId,
    req.body.quantity
  )
  res.send({ data: updated })
})

// Удалить товар
router.delete("/:productId", authenticated, async (req, res) => {
  await removeFromCart(req.user.id, req.params.productId)
  res.send({ error: null })
})

// Очистить корзину
router.delete("/", authenticated, async (req, res) => {
  await clearCart(req.user.id)
  res.send({ error: null })
})

module.exports = router
