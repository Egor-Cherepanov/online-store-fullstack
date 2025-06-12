import { useState } from "react"
import { Product } from "../../../../types"
import { useUser, useHeader } from "../../../../zustand"
import {
  translateCategory,
  translateMale,
  CheckAccess,
  request,
} from "../../../../utils"
import { CustomSelect } from "../custom-select-size/custom-select-size"
import { ROLE } from "../../../../constants"
import { ToastError, ToastSuccess } from "../../../../components"
import "./product-info.scss"

export const ProductInfo = ({ product }: { product: Product }) => {
  const { id, title, male, category, content, price } = product
  const userRole = useUser((state) => state.user)?.roleId
  const fetchProductsInCart = useHeader((state) => state.fetchProductsInCart)

  const [size, setSize] = useState("L")

  const onAddBtnClick = async () => {
    if (CheckAccess([ROLE.ADMIN, ROLE.AUTHORIZED_USER], userRole)) {
      try {
        await request(`/cart`, "POST", {
          productId: id,
          quantity: 1,
          size,
        }).then(() => {
          fetchProductsInCart()
          return ToastSuccess(`${title} добавлен в корзину`)
        })
      } catch (err) {
        console.error("Error fetching products:", err)
        return ToastError(
          "Не удалось добавить товар в корзину. Попробуйте позже"
        )
      }
    } else {
      return ToastError(
        "Для добавления товара в корзину нужно авторизироваться"
      )
    }
  }

  return (
    <div className="product-info-container">
      <h2>{title}</h2>
      <div className="product-info-price">${price}.00</div>
      <div className="product-info-select-row">
        <CustomSelect value={size} onChange={setSize} />
      </div>
      <button className="product-info-add-btn" onClick={onAddBtnClick}>
        Добавить в корзину
      </button>
      <div className="product-info-category">
        Категория: {translateCategory(category)}
      </div>
      <div className="product-info-male">Пол: {translateMale(male)}</div>
      <div className="product-info-id">id: {id}</div>
      <div className="product-info-description">{content}</div>
    </div>
  )
}
