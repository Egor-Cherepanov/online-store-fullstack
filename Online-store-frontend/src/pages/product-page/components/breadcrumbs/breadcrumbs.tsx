import { Link } from "react-router"
import "./breadcrumbs.scss"

type Props = {
  title: string
}

export const Breadcrumbs = ({ title }: Props) => {
  return (
    <div className="breadcrumbs-wrapper">
      <div className="breadcrumbs-contaner">
        <Link to="/">Главная страница</Link>
        <div>/</div>
        <div>{title}</div>
      </div>
    </div>
  )
}
