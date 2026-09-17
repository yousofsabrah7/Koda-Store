
import Home from './pages/Home/index'
import { Navigate, Route, Routes } from "react-router-dom";
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
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       {/* // <Route path="/verity-otp" element={<VerifyOtp />} /> */}

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/forget-password" element={<ForgetPassword />} />
        {/* ---------------------------------------------------- */}
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
        {/* ---------------------------------------------------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;

