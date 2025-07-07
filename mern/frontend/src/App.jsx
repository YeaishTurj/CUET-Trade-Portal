import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-100 to-blue-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
