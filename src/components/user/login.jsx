const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login submitted!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
          >
            Login
          </button>

          {/* Link to Register */}
          <div className="text-center mt-4">
            <a
              href="/register"
              className="text-blue-500 hover:underline text-sm"
            >
              Do not have an account? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
