const AboutSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-8">
          About Agro Nepal
        </h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          Empowering farmers, promoting sustainability, and bringing
          high-quality, locally-sourced agricultural products to your doorstep.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Section */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Our Mission
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>✔️ Bridge the gap between farmers and consumers.</li>
              <li>✔️ Promote sustainable agriculture in Nepal.</li>
              <li>✔️ Improve livelihoods of local farmers.</li>
            </ul>
          </div>
          {/* Why Choose Us Section */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Why Choose Us?
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>✔️ High-quality, origin-verified products.</li>
              <li>✔️ Support for indigenous agricultural treasures.</li>
              <li>✔️ Sustainable farming practices.</li>
            </ul>
          </div>
        </div>

        <div className="bg-green-100 mt-12 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-green-700 mb-4 text-center">
            What We Offer
          </h3>
          {
            <p className="text-gray-600 text-center">
              Discover a wide range of locally-sourced products, including
              organic fruits, spices like cardamom and turmeric, fresh honey,
              and much more. By choosing Agro Nepal, youre investing in the
              future of Nepals agriculture.
            </p>
          }
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
