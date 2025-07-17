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

function App() {
  const fetchUserCart = async () => {
    try {
      const res = await fetch(`${getBaseURL()}/api/cart`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch cart");
      }

      data.items.forEach((item) => {
        dispatch(
          addToCart({
            ...item.product,
            quantity: item.quantity,
            id: item.product._id,
          })
        );
      });
    } catch (error) {
      console.error("❌ Failed to load cart:", error.message);
    }
  };

  const dispatch = useDispatch();
  const { data: user } = useGetSignedInUserQuery();


  useEffect(() => {
    if (user) fetchUserCart();
  }, [user]);

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
