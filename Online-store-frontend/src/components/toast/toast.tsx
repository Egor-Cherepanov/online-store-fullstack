import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const ToastError = (errorMessage: string) => toast.error(errorMessage)
export const ToastSuccess = (successMessage: string) =>
  toast.success(successMessage)
