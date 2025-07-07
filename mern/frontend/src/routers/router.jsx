// src/router/index.js or wherever your router lives
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import NewArrivalsPage from "../pages/NewArrivalsPage.jsx"; // ✅ Import
import PreOwnedProductsPage from "../pages/PreOwnedProductsPage.jsx"; // ✅ Import
import LostFoundProductsPage from "../pages/LostFoundProductsPage.jsx"; // ✅ Import
import PostLostFoundPage from "../pages/PostLostFoundPage.jsx"; // ✅ Import
import PostPreOwnedPage from "../pages/PostPreOwnedPage.jsx"; // ✅ Import
import BecomeSellerPage from "../pages/BecomeSellerPage.jsx"; // ✅ Import
import CartPage from "../pages/CartPage.jsx"; // ✅ Import if needed
import CheckoutPage from "../pages/CheckoutPage.jsx"; // ✅ Import if needed
import ProductDetailsPage from "../pages/ProductDetailsPage.jsx"; // ✅ Import if needed
import UserProfilePage from "../pages/UserProfilePage.jsx"; // ✅ Import if needed
import PostFoundPage from "../pages/PostFoundPage.jsx";
import PostLostPage from "../pages/PostLostPage.jsx"; // ✅ Import if needed
import PostDigitalPage from "../pages/PostDigitalPage.jsx";
import PostFashionPage from "../pages/PostFashionPage.jsx";
import PostElectronicsPage from "../pages/PostElectronicsPage.jsx";
import PostOthersPage from "../pages/PostOthersPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/new-arrivals", element: <NewArrivalsPage /> }, // ✅ Add this line
      { path: "/pre-owned-products", element: <PreOwnedProductsPage /> },
      { path: "/lost-found-products", element: <LostFoundProductsPage /> },
      { path: "/post-lost-found", element: <PostLostFoundPage /> },
      { path: "/post-pre-owned", element: <PostPreOwnedPage /> },
      { path: "/become-seller", element: <BecomeSellerPage /> }, // ✅ Add this line
      { path: "/cart", element: <CartPage /> }, // ✅ Add this line
      { path: "/checkout", element: <CheckoutPage /> }, // ✅ Add this line
      { path: "/product-details/:id", element: <ProductDetailsPage /> }, // ✅ Add this line
      { path: "/user-profile/", element: <UserProfilePage /> }, // ✅ Add this line
      { path: "/post-found", element: <PostFoundPage /> }, // ✅ Add this line
      { path: "/post-lost", element: <PostLostPage /> }, // ✅ Add this line
      { path: "/post-digital", element: <PostDigitalPage /> }, // ✅ Add this line
      { path: "/post-fashion", element: <PostFashionPage /> }, // ✅ Add this line
      { path: "/post-electronics", element: <PostElectronicsPage /> }, // ✅ Add this line
      { path: "/post-others", element: <PostOthersPage /> }, // ✅ Add this line
    ],
  },
]);

export default router;
