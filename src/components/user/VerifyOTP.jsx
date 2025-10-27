import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOtp = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setFormData((prevData) => ({ ...prevData, email: location.state.email }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
  const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/accounts/verify-otp/`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      otp: formData.otp,
    }),
  }
);

      const data = await response.json();

      if (response.ok) {
        // Save the tokens if needed, for example in local storage:
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        toast.success("OTP verified successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          onClose: () => navigate("/login"),
        });
      } else {
        const errorMessage =
          data.detail ||
          Object.entries(data)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
        toast.error(errorMessage, {
          position: "top-right",
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("Network error. Please try again.", {
        position: "top-right",
        theme: "colored",
      });
      console.error("OTP verification error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* OTP Field */}
          <div>
            <label htmlFor="otp" className="block text-gray-700 font-medium">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-green-600 hover:bg-green-900 text-white font-medium py-2 px-4 rounded-lg transition duration-300 ${
              isSubmitting && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default VerifyOtp;
