// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const VendorKYC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [kycVerified, setKycVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    address: "",
    nationalId: "",
    idFront: null,
    idBack: null,
    phone: "",
    email: "",
  });

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });

  const handleKYCChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (file, side) => {
    setFormData({ ...formData, [side]: file });
  };

  const handleKYCSubmit = async (e) => {
    e.preventDefault();
    // Simulated API call
    setTimeout(() => {
      setKycVerified(true);
      setActiveStep(1);
    }, 2000);
  };

  const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (kycVerified) {
      console.log("Product submitted:", productData);
    }
  };

  const steps = ["KYC Verification", "Add Products"];

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {!kycVerified ? (
        <Card component="form" onSubmit={handleKYCSubmit}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Vendor KYC Verification
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleKYCChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleKYCChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Shop Name"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleKYCChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleKYCChange}
                  required
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="National ID Number"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleKYCChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleKYCChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleKYCChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload ID Front
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "idFront")
                    }
                    accept="image/*"
                  />
                </Button>
                {formData.idFront && (
                  <Typography variant="caption" color="text.secondary">
                    {formData.idFront.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload ID Back
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) =>
                      handleFileUpload(e.target.files[0], "idBack")
                    }
                    accept="image/*"
                  />
                </Button>
                {formData.idBack && (
                  <Typography variant="caption" color="text.secondary">
                    {formData.idBack.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  disabled={!Object.values(formData).every(Boolean)}
                >
                  Submit KYC
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Card component="form" onSubmit={handleProductSubmit}>
          <CardContent>
            <Alert severity="success" sx={{ mb: 3 }}>
              KYC Verified! You can now add products.
            </Alert>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={productData.name}
                  onChange={handleProductChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={productData.description}
                  onChange={handleProductChange}
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={productData.price}
                  onChange={handleProductChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={productData.category}
                  onChange={handleProductChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                >
                  Upload Product Images
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        images: [...e.target.files],
                      })
                    }
                    accept="image/*"
                  />
                </Button>
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                  {productData.images.map((file, index) => (
                    <Avatar
                      key={index}
                      variant="rounded"
                      src={URL.createObjectURL(file)}
                      sx={{ width: 100, height: 100 }}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!Object.values(productData).every(Boolean)}
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default VendorKYC;
