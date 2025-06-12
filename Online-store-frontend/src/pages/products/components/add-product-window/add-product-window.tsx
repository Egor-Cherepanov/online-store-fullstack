import { yupResolver } from "@hookform/resolvers/yup"
import { addProductFormSchema, FormData } from "../../../../constants"
import { Controller, useForm } from "react-hook-form"
import { CustomSelect } from "../custom-select/custom-select"
import { request } from "../../../../utils"
import { useProducts } from "../../../../zustand"
import { ToastError, ToastSuccess } from "../../../../components"
import "./add-product-window.scss"

export const AddProductWindow = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(addProductFormSchema),
  })
  const setLoading = useProducts((state) => state.setLoading)

  const onSubmit = async (data: FormData) => {
    console.log(data)
    try {
      setLoading(true)
      const productData = await request(`/products`, "POST", data)
      if (productData.data) ToastSuccess("Товар успешно добавлен")
    } catch (err) {
      console.error("Error fetching products:", err)
      ToastError("Не удалось добавить товар. Попробуйте позже")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-product-window-container">
      <h2>Блок добавления товара</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
        <div>
          <label>Название товара</label>
          <input {...register("title")} />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label>URL изображения</label>
          <input {...register("image")} />
          {errors.image && (
            <p className="error-message">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label>Описание товара</label>
          <input {...register("content")} />
          {errors.content && (
            <p className="error-message">{errors.content.message}</p>
          )}
        </div>

        <div className="form-row">
          <div>
            <label>Цена</label>
            <input type="number" {...register("price")} />
            {errors.price && (
              <p className="error-message">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label>Количество</label>
            <input type="number" {...register("quantity")} />
            {errors.quantity && (
              <p className="error-message">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label>Категория</label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <CustomSelect
                  value={field.value || ""}
                  onChange={field.onChange}
                  optionsType="category"
                />
              )}
            />
            {errors.category && (
              <p className="error-message">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label>Пол</label>
            <Controller
              control={control}
              name="male"
              render={({ field }) => (
                <CustomSelect
                  value={field.value || ""}
                  onChange={field.onChange}
                  optionsType="male"
                />
              )}
            />
            {errors.male && (
              <p className="error-message">{errors.male.message}</p>
            )}
          </div>
        </div>

        <button type="submit">Добавить товар</button>
      </form>
    </div>
  )
}
