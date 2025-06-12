import { useEffect, useState } from "react"
import { Loader, ToastError, ToastSuccess } from "../../components"
import { CartItem } from "../../types"
import { ROLE } from "../../constants"
import { CheckAccess, request } from "../../utils"
import { useHeader, useUser } from "../../zustand"
import { ErrorPage } from "../../pages"
import { CartCard } from "./components"
import "./shopping-cart.scss"

export const ShoppingCart = () => {
  const userRole = useUser((state) => state.user)?.roleId
  const access = CheckAccess([ROLE.ADMIN, ROLE.AUTHORIZED_USER], userRole)
  const [isLoading, setIsLoading] = useState(true)
  const [userCart, setUserCart] = useState<CartItem[] | null>(null)
  const fetchProductsInCart = useHeader((state) => state.fetchProductsInCart)

  useEffect(() => {
    const getCartAsync = async () => {
      try {
        const data = await request("/cart")
        setUserCart(data.data)
      } catch (error) {
        console.error("Ошибка при загрузке корзины" + error)
      } finally {
        setIsLoading(false)
      }
    }
    getCartAsync()
  }, [isLoading])

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      await request(`/cart`, "DELETE")
      ToastSuccess("Заказ успешно оформлен")
    } catch (err) {
      console.error(err)
      ToastError(
        "Не удалось оформить заказ, попробуйте позже. Попробуйте позже"
      )
    } finally {
      fetchProductsInCart()
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (!access) {
    return (
      <ErrorPage
        title="401"
        description="Для просмотра корзины нужно авторизироваться"
      />
    )
  }

  if (!userCart) {
    return (
      <ErrorPage
        title="500"
        description="Ошибка загрузки данных. Попробуйте позже"
      />
    )
  }

  return (
    <div className="shopping-cart-container">
      <h1>Ваша корзина</h1>
      {userCart?.length > 0 ? (
        <>
          <div className="cart-table-header">
            <span></span>
            <span>Цена</span>
            <span>Кол-во</span>
            <span>Итого</span>
          </div>
          <div className="cart-items-list">
            {userCart.map(
              ({
                quantity,
                size,
                product: {
                  image,
                  title,
                  _id,
                  price,
                  quantity: productsQuantity,
                },
              }) => (
                <CartCard
                  key={_id + "_" + size}
                  image={image}
                  title={title}
                  id={_id!}
                  price={price}
                  quantity={quantity}
                  size={size}
                  productsQuantity={productsQuantity}
                  setIsLoading={setIsLoading}
                />
              )
            )}
          </div>
          <div className="cart-summary-row">
            <span style={{ marginRight: "32px" }}>
              $
              {userCart
                .reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)
                .toFixed(2)}{" "}
              USD
            </span>
          </div>
          <button className="cart-checkout-btn" onClick={handleCheckout}>
            Оформить заказ
          </button>
        </>
      ) : (
        <div>Корзина пуста</div>
      )}
    </div>
  )
}
