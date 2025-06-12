import { useEffect, useState } from "react"
import { Loader } from "../../components"
import { ErrorPage } from "../error-page/error-page"
import { Pagination, ProductCard } from "./components"
import { useProducts, useHeader } from "../../zustand"
import { request } from "../../utils"
import { PAGINATION_LIMIT } from "../../constants"
import "./main-page.scss"

export const MainPage = () => {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const { products, loading, error, setLoading, setProducts, setError } =
    useProducts()
  const { searchPhrase, male, category, sortPrice } = useHeader()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        await request(
          `/products?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}&male=${male}&category=${category}&sortPrice=${sortPrice}`
        ).then(({ data: { lastPage, products } }) => {
          setProducts(products)
          setTotalPages(lastPage)
        })
      } catch (err) {
        setError("Не удалось загрузить товары. Попробуйте еще раз позже.")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [
    setProducts,
    page,
    searchPhrase,
    setError,
    setLoading,
    male,
    category,
    sortPrice,
  ])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorPage description={error} />
  }

  if (products.length === 0) {
    return (
      <div className="products-not-found">
        Товары с таким заголовком не найдены
      </div>
    )
  }

  return (
    <div className="products-container">
      <div className="products-cards-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id!}
            image={product.image}
            price={product.price}
            title={product.title}
          />
        ))}
      </div>
      {totalPages <= 1 ? (
        <></>
      ) : (
        <Pagination setPage={setPage} page={page} totalPages={totalPages} />
      )}
    </div>
  )
}
