import { CartCardProps } from "../../../../types"
import { CustomSelect } from "../custom-select/custom-select"
import { request } from "../../../../utils"
import { useHeader } from "../../../../zustand"
import { ToastError, ToastSuccess, ConfirmModal } from "../../../../components"
import { useState } from "react"
import "./cart-card.scss"

export const CartCard = ({
  image,
  title,
  id,
  price,
  quantity,
  size,
  // productsQuantity,
  setIsLoading,
}: CartCardProps) => {
  const fetchProductsInCart = useHeader((state) => state.fetchProductsInCart)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await request(`/cart/${id}`, "DELETE")
      ToastSuccess("Товар успешно удален")
    } catch (err) {
      console.error(err)
      ToastError("Не удалось удалить товар из корзины. Попробуйте позже")
    } finally {
      fetchProductsInCart()
      setIsLoading(false)
    }
  }

  const handleQuantityChange = async (newQuantity: number) => {
    try {
      setIsLoading(true)
      await request(`/cart/${id}`, "PATCH", { quantity: newQuantity })
      ToastSuccess("Кол-во товара успешно изменено")
    } catch (err) {
      console.error(err)
      ToastError("Не изменить кол-во товара. Попробуйте позже")
    } finally {
      fetchProductsInCart()
      setIsLoading(false)
    }
  }

  return (
    <div className="cart-item-row">
      <div className="cart-item-info">
        <img src={image} alt={title} className="cart-item-img" />
        <div className="cart-item-details">
          <div className="cart-item-title">{title}</div>
          <div className="cart-item-text">Размер: {size}</div>
          <div className="cart-item-text">ID: {id}</div>
          <button
            className="cart-item-delete"
            onClick={() => setShowConfirmModal(true)}
          >
            Удалить
          </button>
        </div>
      </div>
      <span>{price.toFixed(2)} $</span>

      <CustomSelect value={quantity} onChange={handleQuantityChange} />

      <span>{(price * quantity).toFixed(2)} $</span>

      {showConfirmModal && (
        <ConfirmModal
          handleDelete={handleDelete}
          message="Вы уверены, что хотите удалить этот товар из корзины?"
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </div>
  )
}
