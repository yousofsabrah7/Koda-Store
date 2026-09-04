import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import RequireAdmin from "./utils/RequireAdmin";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import HomeDashboard from "./components/dashboard/HomeDashboard";
import { useProfile } from "./services/useProfile";

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("Theme");
    return saved === "dark";
  });

  useEffect(() => {
    localStorage.setItem("Theme", isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAdmin />}>
          <Route
            path="/"
            element={<Dashboard isDark={isDark} setIsDark={setIsDark} />}
          >
            <Route index element={<HomeDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            {/* <Route path="products/edit/:id" element={<EditProduct />} /> */}
            {/* <Route path="products/view/:id" element={<ViewProduct />} /> */}
            <Route path="product/new" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
            {/* <Route path="orders/:id" element={<OrderDetails />} /> */}
            <Route path="carts" element={<Cart />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
