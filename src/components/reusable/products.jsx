import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Product() {
  const [searchParams] = useSearchParams();
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
      </div>

      <div className="flex gap-8">
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
                    This is a cabbage
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
