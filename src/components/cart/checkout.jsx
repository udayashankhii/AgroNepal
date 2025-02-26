import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "./useCarts";
import { toast } from "react-hot-toast";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total: cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    phone: "",
  });

  const total = location.state?.total ?? cartTotal ?? 0;

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const shopName = cart.length > 0 ? cart[0].shop_name : "Unknown Shop";
  const handlePlaceOrder = async () => {
    if (Object.values(customer).some((value) => !value.trim())) {
      toast.error("Please fill in all the shipping details.");
      return;
    }
  
    // Ensure a payment method is always sent
    const selectedPaymentMethod = paymentMethod || "cod"; // Default to "cod" if none selected
    const paymentMethodLabel = selectedPaymentMethod === "khalti" ? "Khalti" : "Cash";
  
    const orderData = {
      customer: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        address: customer.address,
        city: customer.city,
        phone: customer.phone,
      },
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: total,
      payment_method: paymentMethodLabel, // Ensure it's always set
      payment_status: selectedPaymentMethod === "khalti" ? "Completed" : "Pending",
      shop_name: shopName,
    };
  
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/orders/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Order placed successfully!");
        clearCart();
  
        if (selectedPaymentMethod === "khalti") {
          // Ensure order ID from backend is included
          console.log("✅ Order Created:", data);
          navigate("/payment", { state: { order: { ...orderData, id: data.id } } });
        } else {
          alert("Order Placed Successfully");
          navigate("/");
        }
      } else {
        toast.error(`Failed to place order: ${data.message || "Try again later."}`);
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("An error occurred while placing the order.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(customer).map((key) => (
                <div key={key} className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {key.replace("_", " ").toUpperCase()}
                  </label>
                  <input
                    type="text"
                    name={key}
                    placeholder={`Enter your ${key.replace("_", " ")}`}
                    value={customer[key]}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-2">
              {[
                { value: "cod", label: "Cash on Delivery" },
                { value: "khalti", label: "Khalti" },
              ].map((option) => (
                <label key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="lg:col-span-1 border rounded-lg p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm py-2">
                <span>
                  {item.name} × {item.quantity} ({item.shop_name})
                </span>
                <span>NPR {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>NPR {total.toLocaleString()}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
