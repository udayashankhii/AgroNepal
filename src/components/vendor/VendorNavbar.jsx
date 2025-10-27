import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const VendorNavbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo/Title */}
        <Typography
          variant="h5"
          component={Link}
          to="/vendor-dashboard"
          sx={{
            textDecoration: "none",
            color: "blue",
            fontWeight: "bold",
          }}
        >
          Vendor Dashboard
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button
            component={Link}
            to="/vendor-dashboard"
            sx={{
              color: "black",
              textTransform: "none",
              fontWeight: "bold",
              mx: 1,
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/vendor-profile"
            sx={{
              color: "black",
              textTransform: "none",
              fontWeight: "bold",
              mx: 1,
            }}
          >
            Profile
          </Button>
          <Button
            component={Link}
            to="/vendor-orders"
            sx={{
              color: "black",
              textTransform: "none",
              fontWeight: "bold",
              mx: 1,
            }}
          >
            Orders
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={{
              color: "red",
              textTransform: "none",
              fontWeight: "bold",
              mx: 1,
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default VendorNavbar;
