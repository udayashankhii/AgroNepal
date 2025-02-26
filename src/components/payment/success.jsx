import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status") || "";

  useEffect(() => {
    // Remove query parameters from URL
    window.history.replaceState(null, "", "/payment/success");

    if (status === "Completed") {
      setTimeout(() => navigate("/"), 3000);
    }
  }, [status, navigate]);

  return (
    <div className="bg-green-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center border border-green-300">
        <h1 className={`text-2xl font-bold ${status === "Completed" ? "text-green-700" : "text-red-600"}`}>
          Payment {status}
        </h1>
        {status === "Completed" ? (
          <p className="text-green-600">Thank you for your purchase! Redirecting...</p>
        ) : (
          <p className="text-red-500">Something went wrong. Please try again.</p>
        )}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
