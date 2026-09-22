import Home from "./pages/Home/index";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import VerifyOtp from "./pages/VerifyOtp/index";
import ForgetPassword from "./pages/ForgetPassword/index";

import Shop from "./pages/Shop/index";
import ProductDetails from "./pages/ProductDetails/index";

import Orders from "./pages/Orders/index";
import OrderDetails from "./pages/OrderDetails/index";
import OrderSuccess from "./pages/OrderSuccess/index";

import Wishlist from "./pages/Wishlist/index";
import Cart from "./pages/Cart/index";
import Checkout from "./pages/Checkout/index";
import Profile from "./pages/Profile/index";

import { useProfile } from "./services/apiHooks/authHook";

import Navbar from "./components/navbar/navbar";

const App = () => {
  // Restores the logged-in user into Redux after refresh
  useProfile();

  function StoreLayout() {
    return (
      <div className="min-h-screen bg-surface-base text-text-primary transition-colors duration-300">
        <Navbar />

        <main>
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/forget-password" element={<ForgetPassword />} />

        {/* Store */}
        <Route element={<StoreLayout />}>
          <Route index element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/shop/:id" element={<ProductDetails />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/orders/:id" element={<OrderDetails />} />

          <Route path="/order-success" element={<OrderSuccess />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
