const categories = [
  { id: 1, name: "Fruits", description: "Fresh and organic fruits" },
  { id: 2, name: "Vegetables", description: "Farm-fresh vegetables" },
  { id: 3, name: "Spices", description: "A variety of spices from Nepal" },
  { id: 4, name: "Herbs", description: "Medicinal and culinary herbs" },
  { id: 5, name: "Honey", description: "Pure, natural honey" },
  { id: 6, name: "Roots & Tubers", description: "Ginger, turmeric, and more" },
  { id: 7, name: "Grains", description: "Rice, wheat, and more staples" },
  {
    id: 8,
    name: "Dried Products",
    description: "Dried fruits, vegetables, and herbs",
  },
];

function Category() {
  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          Product Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border border-gray-200 rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {category.name}
              </h3>
              <p className="text-gray-600 mt-2">{category.description}</p>
              <button className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                View Products
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Category;
