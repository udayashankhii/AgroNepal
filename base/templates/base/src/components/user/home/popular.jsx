const products = [
  {
    name: "Cabbage",
    image: "/cabbage.jpg",
    description: "Fresh and locally grown cabbage.",
  },
  {
    name: "Honey",
    image: "/Honey.jpg",
    description: "Pure and organic honey.",
  },
  {
    name: "Tea",
    image: "/Tea.webp",
    description: "High-quality Nepali tea.",
  },
];

const PopularSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Popular Agricultural Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
