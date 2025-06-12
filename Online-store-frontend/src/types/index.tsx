export interface User {
  id: string
  login: string
  password?: string
  roleId: number
  registeredAt: string
}

export interface ModalState {
  isOpen: boolean
  text: string
  onConfirm: () => void
  onCancel: () => void
}

export interface AppState {
  wasLogout: boolean
  modal: ModalState
}

export interface Product {
  id?: string
  _id?: string
  title: string
  male: "M" | "W" | "U"
  category: string
  quantity: number
  image: string
  content: string
  price: number
}

export interface ProductCardProps {
  key?: string
  id: string
  image: string
  price: number
  title: string
}

export interface PaginationProps {
  setPage: (page: number) => void
  page: number
  totalPages: number
}

export interface AuthFormData {
  login: string
  password: string
}

export interface RegisterFormData {
  login: string
  password: string
  passcheck: string
}

export interface CartItem {
  author: string
  createdAt: string
  product: Product
  quantity: number
  size: string
  updatedAt: string
  _id: string
  __v: number
}

export interface CartCardProps {
  image: string
  title: string
  id: string
  price: number
  quantity: number
  size: string
  productsQuantity: number
  setIsLoading: (loadingStatus: boolean) => void
}
