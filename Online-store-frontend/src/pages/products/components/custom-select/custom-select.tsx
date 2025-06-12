import { useEffect, useState } from "react"
import { PiCaretUpDownBold } from "../../../../constants"
import "./custom-select.scss"

interface SelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  optionsType: "male" | "category"
}

const optionsMale: SelectOption[] = [
  { value: "M", label: "M" },
  { value: "W", label: "W" },
  { value: "U", label: "U" },
]
const optionsCategory: SelectOption[] = [
  { value: "T-Shirt", label: "T-Shirt" },
  { value: "Hoodie", label: "Hoodie" },
  { value: "Long Sleeve", label: "Long Sleeve" },
  { value: "Sweatshirt", label: "Sweatshirt" },
  { value: "Jacket", label: "Jacket" },
  // { value: "Jeans", label: "Jeans" },
  { value: "Pants", label: "Pants" },
  // { value: "Shorts", label: "Shorts" },
  // { value: "Shirt", label: "Shirt" },
  // { value: "Crewneck", label: "Crewneck" },
  // { value: "Vest", label: "Vest" },
  // { value: "Sneakers", label: "Sneakers" },
  // { value: "Cap", label: "Cap" },
  // { value: "Hat", label: "Hat" },
  // { value: "Bag", label: "Bag" },
  { value: "Accessory", label: "Accessory" },
  // { value: "Scarf", label: "Scarf" },
]

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  optionsType,
}) => {
  const [options, setOptions] = useState<SelectOption[]>([])

  useEffect(() => {
    if (optionsType === "male") {
      setOptions(optionsMale)
    } else if (optionsType === "category") {
      setOptions(optionsCategory)
    }
  }, [optionsType])

  return (
    <div className="custom-select-wrapper" style={{ width: "150px" }}>
      <select
        className="custom-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Выберите</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="custom-select-icon">
        <PiCaretUpDownBold size={18} />
      </span>
    </div>
  )
}
