import { Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { registerFormSchema, ROLE } from "../../constants"
import { RegisterFormData } from "../../types"
import { useUser } from "../../zustand"
import { useState } from "react"
import { request } from "../../utils"
import { useResetForm } from "../../hooks"
import "./registration.scss"

export const Registration = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      login: "",
      password: "",
      passcheck: "",
    },
    resolver: yupResolver(registerFormSchema),
  })

  useResetForm(reset)

  const [serverError, setServerError] = useState<string>("")
  const roleId = useUser((state) => state.user)?.roleId
  const loginUser = useUser((state) => state.loginUser)

  const onSubmit = (data: RegisterFormData) => {
    const { login, password } = data
    request("/register", "POST", { login, password }).then(
      ({ error, user }) => {
        if (error) {
          setServerError(`Ошибка запроса ${error}`)
          return
        }

        loginUser(user)
        sessionStorage.setItem("userData", JSON.stringify(user))
        return <Navigate to="/" />
      }
    )
  }

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passcheck?.message
  const errorMessage = formError || serverError

  if (roleId || roleId === ROLE.ADMIN || roleId === ROLE.AUTHORIZED_USER) {
    return <Navigate to="/" />
  }

  return (
    <div className="registration-container">
      <h1>Регистрация</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <input
          type="text"
          placeholder="Логин..."
          {...register("login", {
            onChange: () => setServerError(""),
          })}
        />
        <input
          type="password"
          placeholder="Пароль..."
          {...register("password", {
            onChange: () => setServerError(""),
          })}
        />
        <input
          type="password"
          placeholder="Повторите пароль..."
          {...register("passcheck", {
            onChange: () => setServerError(""),
          })}
        />
        <button type="submit" disabled={!!formError}>
          Зарегистрироваться
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  )
}
