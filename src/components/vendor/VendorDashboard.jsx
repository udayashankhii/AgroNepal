import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet, useLocation } from "react-router-dom";
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
import VendorProductCard from "./VendorProductCard";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const vendorId = localStorage.getItem("vendorId"); // Now comes from API

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
      console.error("Error fetching vendor data:", error);
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

        // Store vendor ID from API response instead of localStorage
        const vendorId = response.data.id.toString();
        localStorage.setItem("vendorId", vendorId);

        fetchData();
      } catch (error) {
        console.error("Verification check failed:", error);
        navigate("/vendor-profile");
      }
    };

    checkVendorVerification();
  }, [navigate]);

  // Function to send updates for product modifications.
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

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // Update the product using the product-specific endpoint.
      await axios.put(
        `http://127.0.0.1:8000/api/vendor/products/${editProduct.id}/`,
        formData,
        config
      );

      fetchData();
      setEditProduct(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error);
    }
  };

  // Function to delete a product given its id.
  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(
        `http://127.0.0.1:8000/api/vendor/products/${productId}/`,
        config
      );
      // Remove the deleted product from state.
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50" }}>
      {/* Header */}
      <Box
        component="header"
        sx={{ bgcolor: "background.paper", boxShadow: 1 }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" color="primary.main" fontWeight="bold">
              Vendor Dashboard
            </Typography>

            <Box component="nav" sx={{ display: "flex", gap: 3 }}>
              <Button
                component={Link}
                to="/vendor-dashboard"
                sx={{ color: "text.secondary", fontWeight: 500 }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/vendor-profile"
                sx={{ color: "primary.main", fontWeight: 500 }}
              >
                Profile
              </Button>
              <Button
                variant="h7"
                color="warming"
                fontWeight="bold"
                onClick={() => navigate("/vendor-orders")}
              >
                Orders
              </Button>
              <Button
                component={Link}
                onClick={() => {
                  localStorage.clear(); // Clear user data
                  navigate("/"); // Navigate to home
                  window.location.href = "/"; // Full reload to update UI
                }}
                sx={{ color: "error.main", fontWeight: 500 }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Outlet />
        {location.pathname === "/vendor-dashboard" && (
          <Box sx={{ mt: 6 }}>
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
        )}
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
              className="mt-2"
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
