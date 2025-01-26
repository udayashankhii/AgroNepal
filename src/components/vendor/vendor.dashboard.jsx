import { useState, useEffect } from "react";
import axios from "axios";

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [vendorInfo, setVendorInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store JWT token
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const vendorResponse = await axios.get(
          "http://localhost:8000/api/vendor/vendors/",
          config
        );
        setVendorInfo(vendorResponse.data[0]);

        const productsResponse = await axios.get(
          "http://localhost:8000/api/vendor/products/",
          config
        );
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">
            Vendor Dashboard
          </h1>
          <nav className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-green-700">
              Dashboard
            </a>
            <a href="#" className="text-gray-600 hover:text-green-700">
              Products
            </a>
            <a href="#" className="text-gray-600 hover:text-green-700">
              Add Product
            </a>
            <a href="#" className="text-gray-600 hover:text-green-700">
              Orders
            </a>
            <a href="#" className="text-gray-600 hover:text-green-700">
              Logout
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Vendor Info Section */}
        {vendorInfo && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Shop Information</h2>
            <div className="bg-white p-6 rounded shadow">
              <p>
                <strong>Shop Name:</strong> {vendorInfo.shop_name}
              </p>
              <p>
                <strong>Description:</strong> {vendorInfo.description}
              </p>
              <p>
                <strong>Phone:</strong> {vendorInfo.phone}
              </p>
              <p>
                <strong>Address:</strong> {vendorInfo.address}
              </p>
              <button className="mt-4 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800">
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* Products Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">My Products</h2>
            <button className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800">
              Add New Product
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow">
                {product.image && (
                  <img
                    src={`http://localhost:8000${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-lg font-bold mt-2">NPR {product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                <div className="flex justify-between mt-4">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
