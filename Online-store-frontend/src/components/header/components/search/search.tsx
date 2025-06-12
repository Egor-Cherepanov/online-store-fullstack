import { useMatch } from "react-router-dom"
import { useState } from "react"
import { IoSearch, IoCloseOutline } from "../../../../constants"
import { useHeader } from "../../../../zustand"
import { debounce } from "../../../../utils"
import "./search.scss"

export const Search = () => {
  const setSearchPhrase = useHeader((state) => state.setSearchPhrase)
  const [phrase, setPhrase] = useState("")
  const matchMain = useMatch("/")

  if (!matchMain) {
    return <></>
  }

  const debouncedSearch = debounce((val: string) => {
    setSearchPhrase(val)
  })

  const handleClearSearch = () => {
    setPhrase("")
    setSearchPhrase("")
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhrase(event.target.value)

    debouncedSearch(event.target.value)
  }

  return (
    <div className="search-container">
      <div className="search-icon-wrapper">
        <IoSearch className="search-icon" />
      </div>
      <input
        className="search-input"
        placeholder="Поиск товаров"
        value={phrase}
        onChange={onChange}
      />
      {phrase && (
        <IoCloseOutline className="close-icon" onClick={handleClearSearch} />
      )}
    </div>
  )
}
