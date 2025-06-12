export function translateMale(male: string): string {
  switch (male) {
    case "M":
      return "Мужской"
    case "W":
      return "Женский"
    // case "F":
    //   return "Женский"
    case "U":
      return "Унисекс"
    default:
      return male
  }
}

export function translateMaleBack(male: string): string {
  switch (male) {
    case "Мужской":
      return "M"
    case "Женский":
      return "W"
    case "Унисекс":
      return "U"
    default:
      return male
  }
}
