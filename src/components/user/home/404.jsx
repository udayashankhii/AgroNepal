const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-700 via-yellow-500 to-green-700 text-white">
      {/* Large 404 Heading */}
      <h1 className="text-9xl font-extrabold drop-shadow-lg">404</h1>

      {/* Subtitle */}
      <p className="mt-4 text-2xl md:text-3xl text-center font-semibold">
        Oops! The page you re looking for isn t here.
      </p>

      {/* Fun Message */}
      <p className="mt-2 text-lg md:text-xl text-center opacity-80">
        It might have been moved, deleted, or eaten by a goat. 🐐
      </p>

      {/* Button to Go Back */}
      <div className="mt-8 flex space-x-4">
        <a
          href="/"
          className="bg-white text-green-700 px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-green-100 transition-all duration-300 text-lg font-semibold"
        >
          Go to Homepage
        </a>
        <a
          href="/contact"
          className="bg-transparent border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-700 transition-all duration-300 text-lg font-semibold"
        >
          Contact Support
        </a>
      </div>

      {/* Illustration */}
      <div className="mt-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-64 h-64 text-white opacity-50"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm.002 18c-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8 4.418 0 8 3.582 8 8 0 4.418-3.582 8-8 8zm0-12a.75.75 0 01.743.648L12.75 9v5.25l3.128 3.127a.75.75 0 11-1.06 1.06l-3.5-3.5a.748.748 0 01-.218-.418L11.25 9v-.352a.75.75 0 01.752-.648z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default PageNotFound;
