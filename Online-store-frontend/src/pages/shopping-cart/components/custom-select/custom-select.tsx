import { PiCaretUpDownBold } from "../../../../constants"
import "./custom-select.scss"

interface CustomSelectProps {
  value: number
  onChange: (value: number) => void
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="custom-select-wrapper">
      <select
        className="custom-select"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {[...Array(10).keys()].map((n) => (
          <option key={n + 1} value={n + 1}>
            {n + 1}
          </option>
        ))}
      </select>
      <span className="custom-select-icon">
        <PiCaretUpDownBold size={18} />
      </span>
    </div>
  )
}
