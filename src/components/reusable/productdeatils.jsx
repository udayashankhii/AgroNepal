import { useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product data based on the ID
    const fetchProduct = async () => {
      // Replace with your API call
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary mb-6">
            NPR {product.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Product Features */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector and Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
