export const CheckAccess = (
  access: number[],
  userRole: number | undefined | null
): boolean => {
  if (typeof userRole === "number") {
    return access.includes(userRole)
  }
  return false
}
