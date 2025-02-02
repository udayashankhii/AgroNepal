import FarmImg from "/farmingg.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleExploreProducts = () => {
    navigate("/product"); // Redirect to the products page
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 bg-green-50">
      {/* Content Section */}
      <div className="max-w-lg mb-8 md:mb-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Fresh from Local Farms to Your Doorstep
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Experience the freshest, high-quality agricultural products delivered
          directly from local farmers to your doorstep, supporting sustainable
          farming and empowering local communities.
        </p>

        {/* Explore Products Button */}
        <button
          onClick={handleExploreProducts}
          className="mt-6 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-500 transition-colors"
        >
          Explore Products
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={FarmImg}
          alt="Farm landscape"
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </section>
  );
};

export default Hero;
