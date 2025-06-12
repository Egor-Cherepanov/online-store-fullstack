import { PiCaretUpDownBold } from "../../../../constants"
import "./custom-select-size.scss"

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
}

const options = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
]

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="custom-select-wrapper">
      <select
        className="custom-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
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
