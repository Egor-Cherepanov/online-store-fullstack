import { Product, User } from "./index"

export interface UseProducts {
  products: Product[] | []
  loading: boolean
  error: null | string
  setProducts: (newProducts: Product[]) => void
  setLoading: (isLoading: boolean) => void
  setError: (newError: string) => void
}

export interface UseHeader {
  searchPhrase: string
  male: string
  category: string
  sortPrice: string
  productsInCart: number
  setSearchPhrase: (val: string) => void
  setMale: (val: string) => void
  setCategory: (val: string) => void
  setSortPrice: (val: string) => void
  fetchProductsInCart: () => Promise<void>
}

export interface UseUser {
  user: null | User
  error: null | string
  loginUser: (newUser: User) => void
  logoutUser: () => void
}
