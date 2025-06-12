import { PaginationProps } from "../../../../types"
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "../../../../constants/icons"
import "./pagination.scss"

export const Pagination: React.FC<PaginationProps> = ({
  setPage,
  page,
  totalPages,
}) => {
  return (
    <div className="paginaton-container">
      <button onClick={() => setPage(1)} disabled={page === 1}>
        <MdFirstPage />
      </button>
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        <MdNavigateBefore />
      </button>
      <div className="current-page">
        Страница: {page} / {totalPages}
      </div>
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        <MdNavigateNext />
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
      >
        <MdLastPage />
      </button>
    </div>
  )
}
