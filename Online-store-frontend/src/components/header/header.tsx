import "./header.scss"
import { Cart, MenuToggle, Search, User, Admin } from "./components"
import { YZY_LOGO } from "../../constants"
import { Link } from "react-router"

export const Header = () => {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-left">
          <MenuToggle />
          <Link to="/">
            <img src={YZY_LOGO} alt="Yeezy Logo" className="yzy-logo" />
          </Link>
        </div>

        <div className="header-right">
          <Search />
          <Cart />
          <User />
          <Admin />
        </div>
      </div>
    </header>
  )
}
