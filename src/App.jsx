import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import RequireAdmin from "./utils/RequireAdmin";
import Login from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        {/* <Route element={<RequireAdmin />}> */}
          {/* <Route path="/dashboard" element={<Dashboard />}> */}
          {/* <Route path="users" element={<Users />} /> */}
          {/* <Route path="products" element={<Products />} /> */}
          {/* <Route path="products/edit/:id" element={<EditProduct />} /> */}
          {/* <Route path="products/view/:id" element={<ViewProduct />} /> */}
          {/* <Route path="products/add" element={<AddProduct />} /> */}
          {/* <Route path="orders" element={<Orders />} /> */}
          {/* <Route path="carts" element={<Cart />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
          {/* </Route> */}
        {/* </Route> */}
      </Routes>
      <Routes>
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
