import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categories } from "./category";

function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products for the given categoryId
    // This is a placeholder for your API call or data fetching logic
    const fetchProducts = async () => {
      try {
        // Here you would make an API call to fetch products for the category
        // For example:
        // const response = await fetch(`/api/products?category=${categoryId}`);
        // const data = await response.json();
        // setProducts(data.products);

        // Mock data for demonstration
        setProducts([
          { id: 1, name: "Apple", categoryId: 1 },
          { id: 2, name: "Banana", categoryId: 1 },
          // Add more products here
        ]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        navigate("/"); // Redirect to home if fetch fails
      }
    };

    fetchProducts();
  }, [categoryId, navigate]);

  // Find the category name from the categories array
  const category = categories.find((cat) => cat.id === parseInt(categoryId));

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          {category ? category.name : "Products"} Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg shadow-lg p-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>
              {/* Add more product details here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
