import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton, Badge, Box } from "@mui/material";
import useCart from "../../cart/useCarts";
// import useCart from "; // Import your custom cart hook

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { itemCount } = useCart(); // Get item count from the cart

  // Authentication check with route change detection
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };
    checkAuth();

    // Listen for storage changes across tabs
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [location.pathname]); // Re-check auth on route change

  // Navigation handlers
  const handleLoginClick = () => navigate("/login");
  const handleLogoClick = () => navigate("/");
  const handleProductsClick = () => navigate("/products");
  // const handleCategoriesClick = () => navigate("/category");
  const handleAboutClick = () => navigate("/about");
  const handleCartClick = () => navigate("/cart");
  const handleAccountClick = () => navigate("/account");
  const handleContactClick = () => navigate("/contact-us");

  // Logout handler
  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Box component="header" className="bg-white shadow-sm">
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="text-2xl font-bold text-green-600 hover:text-green-700 focus:outline-none"
          >
            AgroNepal
          </button>

          {/* Navigation links */}
          <Box
            component="nav"
            className="hidden md:flex space-x-8 flex-1 justify-center ml-8"
          >
            <button
              onClick={handleProductsClick}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              Products
            </button>
            {/* <button
              onClick={handleCategoriesClick}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              Categories
            </button> */}
            <button
              onClick={handleAboutClick}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              About
            </button>
            <button
              onClick={handleContactClick}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              Contact Us
            </button>
          </Box>

          {/* Conditional icons based on login state */}
          <Box className="flex items-center gap-4 ml-auto">
            {isLoggedIn && (
              <>
                {/* Cart Icon with Dynamic Badge */}
                <IconButton
                  onClick={handleCartClick}
                  color="primary"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(5, 150, 105, 0.1)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Badge
                    badgeContent={itemCount} // Dynamically set item count from cart
                    color="primary"
                    overlap="circular"
                    sx={{
                      "& .MuiBadge-badge": {
                        right: -2,
                        top: 4,
                        border: "2px solid white",
                      },
                    }}
                  >
                    <ShoppingCart className="h-6 w-6 text-gray-600" />
                  </Badge>
                </IconButton>

                {/* User Account Icon */}
                <IconButton
                  onClick={handleAccountClick}
                  color="primary"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(5, 150, 105, 0.1)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <User className="h-6 w-6 text-gray-600" />
                </IconButton>
              </>
            )}

            {/* Login/Logout Button */}
            <button
              onClick={isLoggedIn ? handleLogout : handleLoginClick}
              className="hidden md:inline-block px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="h-4 w-4" />
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Hamburger Menu for Mobile */}
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
