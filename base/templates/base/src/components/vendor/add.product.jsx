import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [categories] = useState([
    { id: 1, name: "Fruits", description: "Fresh and organic fruits" },
    { id: 2, name: "Vegetables", description: "Farm-fresh vegetables" },
    { id: 3, name: "Spices", description: "A variety of spices from Nepal" },
    { id: 4, name: "Herbs", description: "Medicinal and culinary herbs" },
    { id: 5, name: "Honey", description: "Pure, natural honey" },
    {
      id: 6,
      name: "Roots & Tubers",
      description: "Ginger, turmeric, and more",
    },
    { id: 7, name: "Grains", description: "Rice, wheat, and more staples" },
  ]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      formData.append("image", newProduct.image);

      await axios.post(
        "http://localhost:8000/api/vendor/products/",
        formData,
        config
      );

      navigate("/vendor/dashboard"); // Redirect back to dashboard
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Add New Product
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate("/vendor-dashboard")}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
