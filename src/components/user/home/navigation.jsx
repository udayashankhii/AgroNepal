import { ShoppingCart, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IconButton, Badge, Box } from "@mui/material";

export default function NavigationBar() {
  const navigate = useNavigate();

  // Navigation handlers (preserved)
  const handleLoginClick = () => navigate("/login");
  const handleLogoClick = () => navigate("/");
  const handleProductsClick = () => navigate("/products");
  const handleCategoriesClick = () => navigate("/category");
  const handleAboutClick = () => navigate("/about");
  const handleCartClick = () => navigate("/cart");
  const handleAccountClick = () => navigate("/account");

  return (
    <Box component="header" className="bg-white shadow-sm">
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Box className="flex justify-between items-center h-16">
          {/* Logo (unchanged) */}
          <button
            onClick={handleLogoClick}
            className="text-2xl font-bold text-green-600 hover:text-green-700 focus:outline-none"
          >
            AgroNepal
          </button>

          {/* Navigation links (structure preserved) */}
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
            <button
              onClick={handleCategoriesClick}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              Categories
            </button>
            <button
              onClick={handleAboutClick}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              About
            </button>
          </Box>

          {/* Icons section with improved alignment */}
          <Box className="flex items-center gap-4 ml-auto">
            <IconButton
              onClick={handleCartClick}
              color="primary"
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  transform: 'scale(1.05)'
                } 
              }}
            >
              <Badge 
                badgeContent={0} 
                color="primary"
                overlap="circular"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -2,
                    top: 4,
                    border: '2px solid white'
                  }
                }}
              >
                <ShoppingCart className="h-6 w-6 text-gray-600" />
              </Badge>
            </IconButton>

            <IconButton
              onClick={handleAccountClick}
              color="primary"
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  transform: 'scale(1.05)'
                } 
              }}
            >
              <User className="h-6 w-6 text-gray-600" />
            </IconButton>

            <button
              onClick={handleLoginClick}
              className="hidden md:inline-block px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
            >
              Login
            </button>

            <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
