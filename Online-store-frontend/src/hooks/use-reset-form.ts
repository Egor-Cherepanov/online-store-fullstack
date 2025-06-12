import { useEffect, useRef } from "react"
import { useUser } from "../zustand"

export const useResetForm = (reset: () => void): void => {
  const user = useUser((state) => state.user)
  const prevUser = useRef(user)

  useEffect(() => {
    if (prevUser.current && !user) {
      reset()
    }
    prevUser.current = user
  }, [user, reset])
}
