import { create } from "zustand"
import { UseProducts, UseHeader, UseUser } from "./types/zustand"
import { request } from "./utils"
import { CartItem } from "./types"

export const useProducts = create<UseProducts>((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (newProducts) => set(() => ({ products: newProducts })),
  setLoading: (isLoading) => set(() => ({ loading: isLoading })),
  setError: (newError) => set(() => ({ error: newError })),
}))

export const useHeader = create<UseHeader>((set) => ({
  searchPhrase: "",
  productsInCart: 0,
  male: "",
  category: "",
  sortPrice: "",
  setSearchPhrase: (val) => set(() => ({ searchPhrase: val })),
  setMale: (val) => set(() => ({ male: val })),
  setCategory: (val) => set(() => ({ category: val })),
  setSortPrice: (val) => set(() => ({ sortPrice: val })),
  fetchProductsInCart: async () => {
    try {
      const data = await request("/cart")
      const count = data.data
        ? data.data.reduce(
            (acc: number, cur: CartItem) => acc + cur.quantity,
            0
          )
        : 0
      set({ productsInCart: count })
    } catch {
      set({ productsInCart: 0 })
    }
  },
}))

export const useUser = create<UseUser>((set) => ({
  user: (() => {
    const userData = sessionStorage.getItem("userData")
    return userData && userData !== "undefined" ? JSON.parse(userData) : null
  })(),
  error: null,
  loginUser: (newUser) => {
    set(() => ({ user: newUser }))
    sessionStorage.setItem("userData", JSON.stringify(newUser))
  },
  logoutUser: () => {
    set(() => ({ user: null }))
    sessionStorage.removeItem("userData")
  },
}))
