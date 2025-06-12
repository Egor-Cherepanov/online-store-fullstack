import "./App.scss"
import "react-toastify/dist/ReactToastify.css"
import { Route, Routes } from "react-router-dom"
import { Header } from "./components"
import {
  MainPage,
  ProductPage,
  Authorization,
  Registration,
  ShoppingCart,
  Products,
  ErrorPage,
} from "./pages"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={true}
        closeButton={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/login" element={<Authorization />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
