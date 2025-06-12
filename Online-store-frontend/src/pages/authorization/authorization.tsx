import { Link, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { authFormSchema, ROLE } from "../../constants"
import { AuthFormData } from "../../types"
import { useUser } from "../../zustand"
import { useState } from "react"
import { request } from "../../utils"
import { useResetForm } from "../../hooks"
import "./authorization.scss"

export const Authorization = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  })

  useResetForm(reset)

  const [serverError, setServerError] = useState<string>("")
  const roleId = useUser((state) => state.user)?.roleId
  const loginUser = useUser((state) => state.loginUser)

  const onSubmit = (data: AuthFormData) => {
    const { login, password } = data
    request("/login", "POST", { login, password }).then(({ error, user }) => {
      if (error) {
        setServerError(`Ошибка запроса ${error}`)
        return
      }

      loginUser(user)
      sessionStorage.setItem("userData", JSON.stringify(user))

      return <Navigate to="/" />
    })
  }

  const formError = errors?.login?.message || errors?.password?.message
  const errorMessage = formError || serverError

  if (roleId || roleId === ROLE.ADMIN || roleId === ROLE.AUTHORIZED_USER) {
    return <Navigate to="/" />
  }

  return (
    <div className="authorization-container">
      <h1>Авторизироваться</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="authorize-form">
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
        <button type="submit" disabled={!!formError}>
          Авторизоваться
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <div className="auth-hint">Впервые в сообществе YZY?</div>
      <Link to="/register">Завести аккаунт</Link>
    </div>
  )
}
