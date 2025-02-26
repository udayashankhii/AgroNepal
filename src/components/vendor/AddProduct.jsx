import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    image: null, // For file upload
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
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found. Please log in.");
      }

      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("stock", newProduct.stock);
      formData.append("category", newProduct.category);
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(
        "http://127.0.0.1:8000/api/vendor/products/",
        formData,
        config
      );

      navigate("/vendor-dashboard", {
        state: { shouldRefreshProducts: Date.now() },
      });
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
    }
  };

  return (
    <Box className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Box className="w-[350px] rounded-lg shadow-lg bg-white p-6">
        <Typography variant="h5" className="font-bold text-green-700 mb-6">
          Add New Product
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Price (NPR)"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={newProduct.stock}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={3}
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2"
          />
          <Box className="flex justify-between mt-4">
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate("/vendor-dashboard")}
            >
              Cancel
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Add Product
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default AddProductPage;
