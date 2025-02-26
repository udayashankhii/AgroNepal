import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Backend API

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [initiationError, setInitiationError] = useState(null);

  useEffect(() => {
    const initiatePayment = async () => {
      const order = location.state?.order;

      console.log("🔍 Received Order Data:", order);

      if (!order || !order.id || !order.total_amount) {
        console.warn("⚠️ No valid order data found! Redirecting...");
        navigate("/");
        return;
      }

      const paymentRequest = {
        amount: order.total_amount * 100, // Convert to paisa
        purchase_order_id: `order-${order.id}`, // Order ID from backend
        purchase_order_name: "Order Payment",
        return_url: "http://localhost:5173/payment/success",
      };

      console.log("📤 Sending Payment Request:", JSON.stringify(paymentRequest, null, 2));

      setIsLoading(true);
      setInitiationError(null);

      try {
        const response = await axios.post(`${API_BASE_URL}/api/payment/khalti/initiate/`, paymentRequest, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("✅ Payment initiated successfully:", response.data);

        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          throw new Error("Invalid response from Khalti");
        }
      } catch (error) {
        console.error("❌ Payment initiation failed:", error);

        if (error.response) {
          console.error("🛑 Full Response Data:", error.response.data);
          console.error("🛑 Status Code:", error.response.status);
          console.error("🛑 Headers:", error.response.headers);
        } else if (error.request) {
          console.error("🛑 No Response Received:", error.request);
        } else {
          console.error("🛑 Error Message:", error.message);
        }

        setInitiationError(error);
      } finally {
        setIsLoading(false);
      }
    };

    initiatePayment();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800">Processing Payment...</h2>
        {isLoading && <p className="text-yellow-600">⌛ Please wait...</p>}
        {initiationError && <p className="text-red-500">❌ {initiationError.message}</p>}
      </div>
    </div>
  );
};

export default Payment;
