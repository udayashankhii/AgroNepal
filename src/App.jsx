import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/user/home/navigation";
import Home from "./components/user/home/home";
import Login from "./components/user/login";
import Register from "./components/user/register";
import Product from "./components/reusable/products";
import Cart from "./components/cart/cart"; // Importing Cart component
import Checkout from "./components/cart/checkout";
import Footer from "./components/user/home/footer";
import PageNotFound from "./components/user/home/404";
import Category from "./components/cart/category";
import AboutSection from "./components/user/home/about";
import ContactUs from "./components/pages/contactus";
import VendorDashboard from "./components/vendor/vendor.dashboard";
const App = () => {
  return (
    <Router>
      <NavigationBar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<NavigationBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/ConctactUs" element={<ContactUs />} />
        <Route path="/vendordashboard" element={<VendorDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
