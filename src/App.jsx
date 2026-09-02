import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RequireAdmin from "./utils/RequireAdmin";
import Login from "./components/Login";
import Homepage from "./pages/Homepage";
import { useEffect, useState } from "react";
function App() {
const [isDark, setIsDark] = useState(()=>{
const saved = localStorage.getItem("Theme")
return saved === "dark"
});
useEffect(()=>{
  localStorage.setItem("Theme",isDark?"dark":"light")},[isDark])
  return (
  
    <BrowserRouter >
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route element={<RequireAdmin />}> */}
<Route index element={<Homepage isDark={isDark} setIsDark={setIsDark} />}>
          {/* <Route path="users" element={<Users />} /> */}
          {/* <Route path="products" element={<Products />} /> */}
          {/* <Route path="products/edit/:id" element={<EditProduct />} /> */}
          {/* <Route path="products/view/:id" element={<ViewProduct />} /> */}
          {/* <Route path="products/add" element={<AddProduct />} /> */}
          {/* <Route path="orders" element={<Orders />} /> */}
          {/* <Route path="carts" element={<Cart />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
        {/* </Route> */}
      </Routes>
      <Routes>{/* <Route path="*" element={<PageNotFound />} /> */}</Routes>
    </BrowserRouter>
   
  );
}
export default App;
