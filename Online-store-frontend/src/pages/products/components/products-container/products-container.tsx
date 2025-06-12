import { useProducts } from "../../../../zustand"
import { ProductElement } from "../product-element/product-element"
import { Product } from "../../../../types"
import "./products-container.scss"

export const ProductsContainer = () => {
  const { products } = useProducts()

  return (
    <div className="products-container-admin">
      <h2>Список товаров</h2>
      {products.length > 0 ? (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Наименование</th>
                <th>Пол</th>
                <th>Категория</th>
                <th>Кол-во</th>
                <th>Фото</th>
                <th>Стоимость</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => (
                <ProductElement key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Товаров пока нет</div>
      )}
    </div>
  )
}
