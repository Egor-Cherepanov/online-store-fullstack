import { useEffect } from "react"
import { BiShoppingBag, ROLE } from "../../../../constants"
import { CheckAccess } from "../../../../utils"
import { useUser, useHeader } from "../../../../zustand"
import { Link } from "react-router-dom"
import "./cart.scss"

export const Cart = () => {
  const userRole = useUser((state) => state.user)?.roleId
  const productsInCart = useHeader((state) => state.productsInCart)
  const fetchProductsInCart = useHeader((state) => state.fetchProductsInCart)
  const access = CheckAccess([ROLE.ADMIN, ROLE.AUTHORIZED_USER], userRole)

  useEffect(() => {
    const fetchCart = async () => {
      if (access) {
        fetchProductsInCart()
      }
    }
    fetchCart()
  }, [access, fetchProductsInCart])

  if (!access) return null

  return (
    <div className="cart-container">
      <Link to="/cart">
        <div className="cart-icon-wrapper">
          <BiShoppingBag className="cart-icon" />
          {productsInCart > 0 && (
            <span className="products-number">{productsInCart}</span>
          )}
        </div>
      </Link>
    </div>
  )
}
