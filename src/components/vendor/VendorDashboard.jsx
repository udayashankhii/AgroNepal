import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
  const [vendorInfo, setVendorInfo] = useState(null);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [vendorResponse, productsResponse] = await Promise.all([
        axios.get("http://localhost:8000/api/vendor/vendors/", config),
        axios.get("http://localhost:8000/api/vendor/products/", config),
      ]);

      setVendorInfo(vendorResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    if (location.state?.shouldRefreshProducts) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
                component={Link}
                to="#"
                sx={{ color: "error.main", fontWeight: 500 }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Outlet context={vendorInfo} />

        {/* Products Section (only shown on main dashboard) */}
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
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {product.image && (
                      <Box
                        component="img"
                        src={`http://localhost:8000${product.image}`}
                        alt={product.name}
                        sx={{ width: "100%", height: 200, objectFit: "cover" }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h3">
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                      >
                        {product.description}
                      </Typography>
                      <Typography variant="h6" color="primary" paragraph>
                        NPR {product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default VendorDashboard;
