// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import NewProducts from "../pages/NewProducts"
import Bidding from "../pages/Bidding"
import LostFound from "../pages/LostFound"
import Cart from "../pages/Cart"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ProductDetail from "../pages/ProductDetail"

export default function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-products" element={<NewProducts />} />
        <Route path="/bidding" element={<Bidding />} />
        <Route path="/lost-found" element={<LostFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
    )
}
