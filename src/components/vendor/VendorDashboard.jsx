import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Modal,
  TextField,
  Stack,
} from "@mui/material";
import VendorNavbar from "./VendorNavbar.jsx"; // Navbar Component
import VendorProductCard from "./VendorProductCard"; // Product Card Component

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // Fetch products for the vendor
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const vendorId = localStorage.getItem("vendorId");

      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { vendor_id: vendorId },
      };

      const response = await axios.get(
        "http://127.0.0.1:8000/api/vendor/products/vendor/",
        config
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const checkVendorVerification = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/vendor/profile/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.data.is_verified) {
          navigate("/vendor-profile");
        }

        localStorage.setItem("vendorId", response.data.id.toString());
        fetchProducts();
      } catch (error) {
        console.error("Verification check failed:", error);
        navigate("/vendor-profile");
      }
    };

    checkVendorVerification();
  }, [navigate]);

  // Update product details
  const handleUpdateProduct = async () => {
    try {
      if (!editProduct) return;

      const token = localStorage.getItem("accessToken") || "";
      const formData = new FormData();
      formData.append("name", editProduct.name);
      formData.append("description", editProduct.description);
      formData.append("price", editProduct.price);
      formData.append("stock", editProduct.stock);
      formData.append("category", editProduct.category);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.put(
        `http://127.0.0.1:8000/api/vendor/products/${editProduct.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchProducts();
      setEditProduct(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error);
    }
  };

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      await axios.delete(
        `http://127.0.0.1:8000/api/vendor/products/${productId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f9f9" }}>
      {/* Navbar */}
      <VendorNavbar />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Products Section */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              My Products
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/product-add"
              sx={{ textTransform: "none" }}
            >
              Add New Product
            </Button>
          </Box>

          {/* Product Cards */}
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <VendorProductCard
                  product={product}
                  onUpdate={() => setEditProduct(product)}
                  onDelete={handleDeleteProduct}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Edit Product Modal */}
      <Modal open={!!editProduct} onClose={() => setEditProduct(null)}>
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            p: 4,
            mx: "auto",
            mt: 10,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Edit Product</Typography>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Product Name"
              value={editProduct?.name || ""}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />
            <TextField
              label="Price"
              type="number"
              value={editProduct?.price || ""}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />
            <TextField
              label="Stock"
              type="number"
              value={editProduct?.stock || ""}
              onChange={(e) =>
                setEditProduct({ ...editProduct, stock: e.target.value })
              }
            />
            <TextField
              label="Category"
              value={editProduct?.category || ""}
              onChange={(e) =>
                setEditProduct({ ...editProduct, category: e.target.value })
              }
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={editProduct?.description || ""}
              onChange={(e) =>
                setEditProduct({ ...editProduct, description: e.target.value })
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateProduct}
            >
              Save Changes
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default VendorDashboard;
