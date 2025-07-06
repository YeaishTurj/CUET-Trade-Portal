// src/router/index.js or wherever your router lives
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import NewArrivalsPage from "../pages/NewArrivalsPage.jsx"; // ✅ Import
import PreOwnedProductsPage from "../pages/PreOwnedProductsPage.jsx"; // ✅ Import
import LostFoundProductsPage from "../pages/LostFoundProductsPage.jsx"; // ✅ Import

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/new-arrivals", element: <NewArrivalsPage /> }, // ✅ Add this line
      { path: "/pre-owned-products", element: <PreOwnedProductsPage />},
      { path: "/lost-found-products", element: <LostFoundProductsPage />}
    ],
  },
]);

export default router;
