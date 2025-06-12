import * as yup from "yup"

export const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/^\w+$/, "Неверный логин. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Минимум 3 символа")
    .max(15, "Неверный логин. Минимум 15 символов"),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %"
    )
    .min(8, "Неверно заполнен пароль. Минимум 8 символа")
    .max(30, "Неверно заполнен пароль. Минимум 30 символов"),
})

export const registerFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/^\w+$/, "Неверный логин. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Минимум 3 символа")
    .max(15, "Неверный логин. Минимум 15 символов"),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(
      /^[\w#%]+$/,
      "Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # %"
    )
    .min(8, "Неверно заполнен пароль. Минимум 8 символа")
    .max(30, "Неверно заполнен пароль. Минимум 30 символов"),
  passcheck: yup
    .string()
    .required("Заполните повтор пароля")
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
})

export const addProductFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Название товара обязательно")
    .min(3, "Название товара должно состоять из минимум 3 символов"),
  image: yup
    .string()
    .url("Некорректный URL изображения")
    .required("Изображение обязательно"),
  content: yup.string().required("Описание обязательно"),
  quantity: yup
    .number()
    .typeError("Должно быть числом")
    .positive("Количество должно быть положительным")
    .required("Количество обязательно"),
  category: yup.string().required("Категория обязательна"),
  male: yup
    .string()
    .oneOf(["M", "W", "U"], "Выберите пол")
    .required("Пол обязателен"),
  price: yup
    .number()
    .typeError("Должно быть числом")
    .positive("Цена должна быть положительной")
    .required("Цена обязательна"),
})
export type FormData = yup.InferType<typeof addProductFormSchema>
