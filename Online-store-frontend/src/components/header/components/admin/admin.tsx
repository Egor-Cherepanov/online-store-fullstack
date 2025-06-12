import { Link } from "react-router"
import { ROLE, GrUserAdmin } from "../../../../constants"
import { CheckAccess } from "../../../../utils"
import { useUser } from "../../../../zustand"
import "./admin.scss"

export const Admin = () => {
  const userRole = useUser((state) => state.user)?.roleId
  const access = CheckAccess([ROLE.ADMIN], userRole)

  if (!access) return null

  return (
    <Link to="/products">
      <GrUserAdmin className="admin-icon" size={"20px"} />
    </Link>
  )
}
