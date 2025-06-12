import { AddProductWindow, ProductsContainer } from "./components"
import { useEffect } from "react"
import { useProducts, useUser } from "../../zustand"
import { CheckAccess, request } from "../../utils"
import { Loader } from "../../components"
import { ErrorPage } from "../error-page/error-page"
import { ROLE } from "../../constants"
import "./products.scss"

export const Products = () => {
  const userRole = useUser((state) => state.user)?.roleId
  const access = CheckAccess([ROLE.ADMIN], userRole)

  const { products, loading, error, setProducts, setLoading, setError } =
    useProducts()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        await request(`/products`).then(({ data: { products } }) => {
          setProducts(products)
        })
      } catch (err) {
        setError("Не удалось загрузить товары. Попробуйте еще раз позже.")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [setProducts, setError, setLoading])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorPage description={error} />
  }

  if (!access) {
    return (
      <ErrorPage title="403" description="У вас нет доступа к этой странице" />
    )
  }

  console.log(products)
  return (
    <div className="products-page-container">
      <AddProductWindow />
      <ProductsContainer />
    </div>
  )
}
