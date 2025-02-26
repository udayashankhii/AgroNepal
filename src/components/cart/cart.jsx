import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import useCart from "./useCarts";

function Cart() {
  const { cart, addItem, removeItem, clearCart, itemCount } = useCart();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Cart ({itemCount} items)</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="border-b py-4">
              <div className="flex items-center justify-between">
                {/* Added image container */}
                <div className="flex flex-1 items-start gap-4">
                  <img
                    src={`http://127.0.0.1:8000${item.image}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "/fallback-image.jpg"; // Add fallback image
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    {/* Add shop name */}
                    <p className="text-sm text-gray-500 mt-1">
                      Shop: {item.shop_name}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      {/* Existing quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded-md hover:bg-gray-100"
                          disabled={item.quantity === 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addItem(item)}
                          className="p-1 rounded-md hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      {/* Trash button remains same */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-500">
                    NPR {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.price.toLocaleString()} each
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Rest of the component remains the same */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Total:</h3>
              <p className="text-green-500 text-xl font-semibold">
                NPR {totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                state={{
                  total: totalAmount,
                  shopNames: [...new Set(cart.map((item) => item.shop_name))], // Unique shop names
                }}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
