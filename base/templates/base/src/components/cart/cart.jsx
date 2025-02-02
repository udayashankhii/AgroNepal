import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCart from "./useCarts"; // Updated import statement

function Cart() {
  const { cart, removeItem, addItem } = useCart(); // Removed itemCount

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Add some products to your cart to continue shopping.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 border rounded-lg p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-primary">
                  NPR {item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => addItem(item)}
                  className="p-1"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>NPR {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}</span>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-primary text-white text-center px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
