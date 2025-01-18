import { ShoppingCart, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleProductsClick = () => {
    navigate("/product");
  };

  const handleCategoriesClick = () => {
    navigate("/category"); // Update the route for Categories
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold text-green-600 hover:text-green-700 focus:outline-none"
            >
              AgroNepal
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={handleProductsClick}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              Products
            </button>
            <button
              onClick={handleCategoriesClick} // On click, navigate to /category
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              Categories
            </button>
            <a href="#" className="text-gray-700 hover:text-green-600">
              Vendors
            </a>
            <a href="#" className="text-gray-700 hover:text-green-600">
              About
            </a>
          </nav>

          {/* Icons & Login */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={handleLoginClick}
              className="hidden md:inline-block px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
            >
              Login
            </button>
            <button className="md:hidden p-2 rounded-full hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
