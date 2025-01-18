import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/user/home/navigation";
import Home from "./components/user/home/home";
import Login from "./components/user/login";
import Register from "./components/user/register";
import Product from "./components/reusable/products";
import Cart from "./components/pages/cart"; // Importing Cart component
import Checkout from "./components/pages/checkout";
import Footer from "./components/user/home/footer";
import PageNotFound from "./components/user/home/404";
import Category from "./components/pages/category";

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
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
