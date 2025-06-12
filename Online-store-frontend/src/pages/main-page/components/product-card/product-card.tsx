import { Link } from "react-router-dom"
import { ProductCardProps } from "../../../../types"
import "./product-card.scss"

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  id,
  price,
  title,
}) => {
  return (
    <Link to={`/product/${id}`} className="product-card-link">
      <div className="product-card-container">
        <img src={image} className="product-card-img" />
        <div className="product-card-title">{title}</div>
        <div className="product-card-price">{price}$</div>
      </div>
    </Link>
  )
}
