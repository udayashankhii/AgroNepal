import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/user/home/home";
import Login from "./components/user/LoginForm";
import Register from "./components/user/RegisterForm";
import Cart from "./components/cart/cart";
import Checkout from "./components/cart/checkout";
import PageNotFound from "./components/user/home/404";
import AboutSection from "./components/user/home/About";
import ContactUs from "./components/pages/contactus";
import VendorDashboard from "./components/vendor/VendorDashboard";
import AddProductPage from "./components/vendor/AddProduct";
import Products from "./components/productsection/products"; // Products listing page
import ProductDetailSection from "./components/productsection/ProductDetails";
import Category from "./components/productsection/category";

const App = () => {
  return (
    <Router>
      {/* Global Navigation Bar */}
      {/* <NavigationBar /> */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetailSection />} />{" "}
        {/* Dynamic product details */}
        {/* Vendor Dashboard */}
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/product/add" element={<AddProductPage />} />
        {/* Cart and Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Other Pages */}
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contactUs" element={<ContactUs />} />
        {/* 404 Page */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      {/* Global Footer */}
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
