import { useMatch } from "react-router-dom"
import { useState } from "react"
import {
  FaBars,
  IoCloseOutline,
  GENDERS,
  SORT_OPTIONS,
  CATEGORIES,
} from "../../../../constants"
import { motion, AnimatePresence } from "framer-motion"
import { useHeader } from "../../../../zustand"
import { translateMaleBack, translateCategoryBack } from "../../../../utils"
import "./menu-toggle.scss"

export function MenuToggle() {
  const [open, setOpen] = useState(false)
  const match = useMatch("/")
  const { setCategory, setMale, setSortPrice, male, category, sortPrice } =
    useHeader()

  if (!match) return null

  return (
    <div className="menu-container">
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              className="icon-wrapper"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IoCloseOutline className="close-icon" />
            </motion.div>
          ) : (
            <motion.div
              key="bars"
              className="icon-wrapper"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaBars className="open-icon" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="menu-section">
              <h4>Пол</h4>
              <ul>
                {GENDERS.map((gender) => {
                  const value = translateMaleBack(gender)
                  const isActive = male === value

                  return (
                    <li
                      key={gender}
                      style={{ fontWeight: isActive ? "bold" : "400" }}
                      onClick={() => {
                        setMale(isActive ? "" : value)
                      }}
                    >
                      {gender}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="menu-section">
              <h4>Цена</h4>
              <ul>
                {SORT_OPTIONS.map((option) => {
                  const value = option === "Дешевле" ? "asc" : "desc"
                  const isActive = sortPrice === value

                  return (
                    <li
                      key={option}
                      style={{ fontWeight: isActive ? "bold" : "400" }}
                      onClick={() => {
                        setSortPrice(isActive ? "" : value)
                      }}
                    >
                      {option}
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="menu-section">
              <h4>Категории</h4>
              <ul>
                {CATEGORIES.map((cat) => {
                  const value = translateCategoryBack(cat)
                  const isActive = category === value

                  return (
                    <li
                      key={cat}
                      style={{ fontWeight: isActive ? "bold" : "400" }}
                      onClick={() => {
                        setCategory(isActive ? "" : value)
                      }}
                    >
                      {cat}
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
