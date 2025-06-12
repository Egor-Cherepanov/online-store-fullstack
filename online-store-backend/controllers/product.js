const Product = require("../models/Product")

//add
async function addProduct(product) {
  const newProduct = await Product.create(product)

  return newProduct
}

//edit
async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
  })

  return newProduct
}

//delete
function deleteProduct(id) {
  return Product.deleteOne({ _id: id })
}

//get
function getProduct(id) {
  return Product.findById(id)
}

async function getProducts(search = "", limit = 100, page = 1, filters = {}) {
  const query = {
    title: { $regex: search, $options: "i" },
  }

  if (filters.male) {
    query.male = filters.male
  }

  if (filters.category) {
    query.category = filters.category
  }

  const sort = {}
  if (filters.sortPrice === "asc") {
    sort.price = 1
  } else if (filters.sortPrice === "desc") {
    sort.price = -1
  } else {
    sort.createdAt = -1
  }

  const [products, count] = await Promise.all([
    Product.find(query)
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .sort(sort),
    Product.countDocuments(query),
  ])

  return {
    products,
    lastPage: Math.ceil(count / limit),
  }
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  getProduct,
  getProducts,
}
