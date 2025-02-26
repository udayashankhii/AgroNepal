import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/user/home/home";
import Login from "./components/user/LoginForm";
import Register from "./components/user/RegisterForm";
import Cart from "./components/cart/cart";
import Checkout from "./components/cart/checkout";
import PageNotFound from "./components/pages/404";
import ContactUs from "./components/pages/contactus";
import VendorDashboard from "./components/vendor/VendorDashboard";
import AddProductPage from "./components/vendor/AddProduct";
// import Products from "./components/productsection/products"; // Products listing page
import ProductDetailSection from "./components/productsection/ProductDetails";
import Footer from "./components/user/home/footer";
import NavigationBar from "./components/user/home/navigation";
import Account from "./components/account/account";
import VendorKYC from "./components/vendor/VendorProfile";
import AboutSection from "./components/pages/About";
import { Category } from "@mui/icons-material";
import VenOder from "./components/vendor/Vendororders";
import Products from "./components/productsection/Products";
import PaymentForm from "./components/payment/payment";
import SuccessPage from "./components/payment/success";
import VerifyOtp from "./components/user/VerifyOTP";
// import AdminPanel from "./components/admin/admin";

const getUserRole = () => {
  return localStorage.getItem("role") || "user"; // Default to "user" if no role is set
};

const App = () => {
  const userRole = getUserRole();
  const isVendor = userRole === "vendor";

  return (
    <Router>
      {/* Conditionally render the NavigationBar only if the user is NOT a vendor */}
      {!isVendor && <NavigationBar />}

      <Routes>
        {/* Home route: Redirect vendors to their dashboard */}
        <Route
          path="/"
          element={
            isVendor ? <Navigate to="/vendor-dashboard" replace /> : <Home />
          }
        />
        <Route
          path="/payment"
          element={
            <PaymentForm
              product={{
                id: "12345",
                name: "Organic Apples",
                price: 15, // NPR 1500
              }}
            />
          }
        />
        <Route path="/payment/success" element={<SuccessPage />} />

        {/* Authentication */}
        {/* <Route path="/admin" element={<AdminPanel />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetailSection />} />

        {/* Cart and Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Other Public Pages */}
        <Route path="/category" element={<Category />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/account" element={<Account />} />

        {/* Vendor Protected Routes */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/product-add" element={<AddProductPage />} />
        <Route path="/vendor-profile" element={<VendorKYC />} />
        <Route path="/vendor-orders" element={<VenOder />} />

        {/* 404 - Not Found */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      {/* Conditionally render the Footer only if the user is NOT a vendor */}
      {!isVendor && <Footer />}
    </Router>
  );
};

export default App;
