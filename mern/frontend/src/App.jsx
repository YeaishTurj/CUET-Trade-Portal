import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetSignedInUserQuery } from "./redux/features/auth/authApi";
import { getBaseURL } from "./utils/baseURL";
import { addToCart } from "./redux/features/cart/cartSlice";
import { signOut, setUser } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { data: user, isError, error } = useGetSignedInUserQuery();

  // 🔒 Auto-logout if token is expired or invalid
  useEffect(() => {
    if (isError && error?.status === 401) {
      dispatch(signOut());
      console.warn("🔒 Token expired or invalid — user signed out");
    }
  }, [isError, error, dispatch]);

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-100 to-blue-50">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
