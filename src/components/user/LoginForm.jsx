import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const GOOGLE_CLIENT_ID =
//   "302616355850-0knckl0gobuncismjobvjldf692ghre6.apps.googleusercontent.com"; // Replace with your Google Client ID

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("role", data.role);

        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      } else {
        toast.error(data.detail || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
    }

    setLoading(false);
  };

  // const handleGoogleSuccess = async (response) => {
  //   try {
  //     const googleToken = response.credential;
  //     const googleResponse = await fetch(
  //       "http://127.0.0.1:8000/api/accounts/google-login/",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ token: googleToken }),
  //       }
  //     );

  //     const data = await googleResponse.json();

  //     if (googleResponse.ok) {
  //       localStorage.setItem("accessToken", data.access);
  //       localStorage.setItem("refreshToken", data.refresh);
  //       localStorage.setItem("role", data.role);

  //       toast.success("Google login successful!");
  //       setTimeout(() => {
  //         navigate("/");
  //         window.location.reload();
  //       }, 1500);
  //     } else {
  //       toast.error("Google login failed.");
  //     }
  //   } catch (error) {
  //     toast.error("Error connecting to server.");
  //   }
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* <div className="mt-4 text-center">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed.")}
            />
          </GoogleOAuthProvider>
        </div> */}

        <p className="text-center mt-4 text-sm">
          Dont have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// const Login = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const handleGoogleSuccess = async (response) => {
//     setLoading(true);
//     try {
//       const googleToken = response.credential;

//       const res = await fetch("http://127.0.0.1:8000/api/accounts/google-login/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token: googleToken }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("accessToken", data.accessToken);
//         localStorage.setItem("refreshToken", data.refreshToken);
//         localStorage.setItem("role", data.role);

//         toast.success("Google login successful!");
//         setTimeout(() => {
//           navigate("/");
//           window.location.reload();
//         }, 1500);
//       } else {
//         toast.error(data.message || "Google login failed.");
//       }
//     } catch (error) {
//       toast.error("Error connecting to server.");
//     }
//     setLoading(false);
//   };

//   return (
//     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//       <div className="flex min-h-screen items-center justify-center bg-gray-100">
//         <div className="bg-white shadow-lg rounded-lg p-6 w-96">
//           <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

//           <div className="flex flex-col items-center">
//             {loading ? (
//               <p className="text-blue-600 font-semibold">Processing...</p>
//             ) : (
//               <GoogleLogin
//                 onSuccess={handleGoogleSuccess}
//                 onError={() => toast.error("Google login failed.")}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Login;
