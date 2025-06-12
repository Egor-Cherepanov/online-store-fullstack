import "./error-page.scss"

interface ErrorProps {
  title?: string
  description?: string
}

export const ErrorPage = ({
  title = "404",
  description = "Страница, которую вы ищите не существует",
}: ErrorProps) => (
  <div className="notfound-container" role="alert">
    <div className="notfound-title">{title}</div>
    <div className="notfound-description">{description}</div>
  </div>
)
