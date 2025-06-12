import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import "./toast.scss"

export const ToastError = (errorMessage: string) => toast.error(errorMessage)
export const ToastSuccess = (successMessage: string) =>
  toast.success(successMessage)
