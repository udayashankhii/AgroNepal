import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLoginHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract authorization code from URL (assumes OAuth redirect flow)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      authenticateGoogleUser(code);
    } else {
      toast.error("Google login failed. Please try again.");
      navigate("/login");
    }
  }, []);

  const authenticateGoogleUser = async (code) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/google-login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("role", data.role);

        toast.success("Google login successful!", {
          position: "top-center",
          autoClose: 2000,
        });

        // Redirect based on role
        setTimeout(() => {
          navigate(`/${data.redirect}`);
          window.location.reload();
        }, 1500);
      } else {
        toast.error(data.detail || "Google login failed.");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Authenticating with Google...</p>
    </div>
  );
};

export default GoogleLoginHandler;
