const Product = require("../models/Product")

//add
async function addProduct(product) {
  const newProduct = await Product.create(product)

  // await newPost.populate({
  //   path: "comments",
  //   populate: "author",
  // })

  return newProduct
}

//edit
async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
  })

  // await newPost.populate({
  //   path: "comments",
  //   populate: "author",
  // })

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

//get list with search and pagination
// async function getProducts(search = "", limit = 100, page = 1) {
//   const [products, count] = await Promise.all([
//     Product.find({ title: { $regex: search, $options: "i" } })
//       .limit(limit)
//       .skip((page - 1) * limit)
//       .sort({ ceatedAt: -1 }),
//     Product.countDocuments({ title: { $regex: search, $options: "i" } }),
//   ])

//   return {
//     products,
//     lastPage: Math.ceil(count / limit),
//   }
// }

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
