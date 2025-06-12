import { URL_ADRES } from "../constants"

export const request = async (url: string, method = "GET", data = {}) => {
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    credentials: "include",
  }

  // Добавляем body только для методов, которые его поддерживают
  if (method !== "GET" && method !== "HEAD" && data) {
    config.body = JSON.stringify(data)
  }

  return await fetch(`${URL_ADRES}${url}`, config).then((res) => res.json())
}
