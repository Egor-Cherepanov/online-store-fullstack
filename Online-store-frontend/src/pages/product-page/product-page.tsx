import { useParams } from "react-router-dom"
import { Breadcrumbs, ProductInfo } from "./components"
import { request } from "../../utils"
import { useEffect, useRef, useState } from "react"
import { Product } from "../../types"
import { Loader } from "../../components"
import { ErrorPage } from "../error-page/error-page"
import "./product-page.scss"

export const ProductPage = () => {
  const paramsId = useParams().productId
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<null | string>(null)
  const [product, setProduct] = useState<Product | null>(null)

  const infoRef = useRef<HTMLDivElement>(null)
  const [side, setSide] = useState(400)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        await request(`/products/${paramsId}`).then((res) => {
          setProduct(res.data)
        })
      } catch (err) {
        setError("Не удалось загрузить товар. Попробуйте еще раз позже.")
        console.error("Error fetching products:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [paramsId])

  useEffect(() => {
    if (infoRef.current) {
      setSide(infoRef.current.offsetHeight)
    }
  }, [product])

  if (isLoading) {
    return <Loader />
  }

  if (error || !product) {
    return <ErrorPage description={error!} />
  }

  return (
    <div className="product-page-container">
      <Breadcrumbs title={product.title} />
      <div className="product-container">
        <div
          className="product-card-img-wrapper"
          style={{
            width: side,
            height: side,
          }}
        >
          <img
            src={product.image}
            className="product-card-img"
            alt={product.title}
          />
        </div>
        <div className="product-info-wrapper" ref={infoRef}>
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  )
}
