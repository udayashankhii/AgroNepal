import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";

function Product() {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const category = searchParams.get("category");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          {category
            ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
            : "All Products"}
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center space-x-2 text-gray-600"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex gap-8">
        {/* Filters */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block w-64 shrink-0`}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                <input type="range" min="0" max="5000" className="w-full" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>NPR 0</span>
                  <span>NPR 5,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid or Product Details */}
        <div className="flex-1">
          {selectedProduct ? (
            <div className="p-6 bg-white rounded-lg shadow">
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-primary mb-4 underline"
              >
                Back to Products
              </button>
              <div className="flex gap-6">
                <div className="aspect-square w-1/2 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-primary font-medium text-lg mb-4">
                    NPR {selectedProduct.price}
                  </p>
                  <p className="text-gray-600">
                    This is a detailed description of the product. Add more
                    details as required.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                  <p className="text-primary font-medium">
                    NPR {product.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const categories = [
  { id: "cabbage", name: "Cabbage" },
  { id: "honey", name: "Honey" },
  { id: "tea", name: "Tea" },
];

const products = [
  {
    id: "1",
    name: "cabbage",
    price: "120",
    image: "/cabbage.jpg",
    category: "Vegetables",
  },
  {
    id: "2",
    name: "Organic Green Tea",
    price: "550",
    image: "/Tea.webp",
    category: "tea",
  },
  {
    id: "3",
    name: "Organic Honey",
    price: "1,000",
    image: "/Honey.jpg",
    category: "Honey",
  },
];
export default Product;
