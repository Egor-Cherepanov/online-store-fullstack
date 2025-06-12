import { Link, useNavigate } from "react-router-dom"
import { MdLogin } from "../../../../constants"
import { useUser } from "../../../../zustand"
import { request } from "../../../../utils"
import "./user.scss"

export const User = () => {
  const user = useUser((state) => state.user)
  const logoutUser = useUser((state) => state.logoutUser)
  const navigate = useNavigate()

  const onLogoutClick = () => {
    request("/logout", "POST").then(() => {
      logoutUser()
      sessionStorage.removeItem("userData")
      navigate("/")
    })
  }

  return (
    <div className="user-container">
      {user ? (
        <div className="user-logged" onClick={onLogoutClick}>
          <span className="user-name">{user.login}</span>
          <MdLogin className="login-icon" />
        </div>
      ) : (
        <Link to="/login">
          <div className="user-login">
            <span className="authorize-text">Войти</span>
            <MdLogin className="login-icon" />
          </div>
        </Link>
      )}
    </div>
  )
}
