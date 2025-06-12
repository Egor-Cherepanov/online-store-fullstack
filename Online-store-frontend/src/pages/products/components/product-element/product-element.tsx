import { Product } from "../../../../types"
import { MdClose, RiPencilFill } from "../../../../constants"
import "./product-element.scss"
import { useState } from "react"
import { ConfirmModal, ToastError, ToastSuccess } from "../../../../components"
import { useProducts } from "../../../../zustand"
import { request } from "../../../../utils"
import { PatchProductWindow } from "../patch-product-window/patch-product-window"

interface ProductElementProps {
  product: Product
}

export const ProductElement = ({ product }: ProductElementProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showPatchModal, setShowPatchModal] = useState(false)
  const { setLoading } = useProducts()

  const handleDelete = async () => {
    try {
      setLoading(true)
      const response = await request(`/products/${product.id}`, "DELETE")
      if (!response.error) ToastSuccess("Товар успешно удален")
    } catch (err) {
      console.error(err)
      ToastError("Не удалось удалить товар из корзины. Попробуйте позже")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <tr className="product-row">
        <td>{product.id}</td>
        <td className="product-name">{product.title}</td>
        <td>{product.male}</td>
        <td>{product.category}</td>
        <td>{product.quantity}</td>
        <td>
          <a href={product.image} target="_blank" rel="noreferrer">
            {product.image}
          </a>
        </td>
        <td>{product.price.toFixed(2)}</td>
        <td className="actions">
          <button className="edit-btn" onClick={() => setShowPatchModal(true)}>
            <RiPencilFill size={20} />
          </button>
          <button
            className="delete-btn"
            onClick={() => setShowConfirmModal(true)}
          >
            <MdClose size={20} />
          </button>
        </td>
      </tr>
      {showConfirmModal && (
        <ConfirmModal
          handleDelete={handleDelete}
          message="Вы уверены, что хотите удалить этот товар?"
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
      {showPatchModal && (
        <PatchProductWindow
          setShowPatchModal={setShowPatchModal}
          product={product}
        />
      )}
    </>
  )
}
