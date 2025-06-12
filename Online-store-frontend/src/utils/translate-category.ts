export function translateCategory(category: string): string {
  switch (category) {
    case "T-Shirt":
      return "Футболка"
    case "Hoodie":
      return "Худи"
    case "Long Sleeve":
      return "Лонгслив"
    case "Sweatshirt":
      return "Свитшот"
    case "Jacket":
      return "Куртка"
    case "Pants":
      return "Брюки"
    case "Accessory":
      return "Аксессуар"
    default:
      return category
  }
}

export function translateCategoryBack(category: string): string {
  switch (category) {
    case "Футболка":
      return "T-Shirt"
    case "Худи":
      return "Hoodie"
    case "Лонгслив":
      return "Long Sleeve"
    case "Свитшот":
      return "Sweatshirt"
    case "Куртка":
      return "Jacket"
    case "Брюки":
      return "Pants"
    case "Аксессуар":
      return "Accessory"
    default:
      return category
  }
}
