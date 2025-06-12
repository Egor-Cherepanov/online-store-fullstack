const express = require("express")
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require("../controllers/product")
const authenticated = require("../middlewares/authenticated")
const hasRole = require("../middlewares/hasRole")
const mapProduct = require("../helpers/mapProduct")
const ROLES = require("../constants/roles")

const router = express.Router({ mergeParams: true })

// router.get("/", async (req, res) => {
//   const { products, lastPage } = await getProducts(
//     req.query.search,
//     req.query.limit,
//     req.query.page
//   )

//   res.send({ data: { lastPage, products: products.map(mapProduct) } })
// })

router.get("/", async (req, res) => {
  const {
    search = "",
    limit = 100,
    page = 1,
    male,
    category,
    sortPrice,
  } = req.query

  const { products, lastPage } = await getProducts(search, limit, page, {
    male,
    category,
    sortPrice,
  })

  res.send({ data: { lastPage, products: products.map(mapProduct) } })
})

router.get("/:id", async (req, res) => {
  const product = await getProduct(req.params.id)

  res.send({ data: mapProduct(product) })
})

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newProduct = await addProduct({
    title: req.body.title,
    male: req.body.male,
    category: req.body.category,
    quantity: req.body.quantity,
    content: req.body.content,
    image: req.body.image,
    price: req.body.price,
  })

  res.send({ data: mapProduct(newProduct) })
})

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedPost = await editProduct(req.params.id, {
      title: req.body.title,
      male: req.body.male,
      category: req.body.category,
      quantity: req.body.quantity,
      content: req.body.content,
      image: req.body.image,
      price: req.body.price,
    })

    res.send({ data: mapProduct(updatedPost) })
  }
)

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteProduct(req.params.id)

    res.send({ error: null })
  }
)

module.exports = router
