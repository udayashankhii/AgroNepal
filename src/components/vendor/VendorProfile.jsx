import { VerifiedUser } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useOutletContext } from "react-router-dom";

const ProfileSection = () => {
  const theme = useTheme();
  const vendorInfo = useOutletContext();

  // Check KYC status from localStorage
  const isKYCVerified = localStorage.getItem("kycVerified") === "true";

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", my: 4 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              alt={vendorInfo?.shopName}
              src={vendorInfo?.avatar}
              sx={{
                width: 120,
                height: 120,
                [theme.breakpoints.down("md")]: { width: 80, height: 80 },
              }}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {vendorInfo?.shopName}
              </Typography>
              {isKYCVerified ? (
                <Chip
                  icon={<VerifiedUser />}
                  label="KYC Verified"
                  color="success"
                  variant="outlined"
                />
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/vendor/kyc"
                  sx={{ textTransform: "none" }}
                >
                  Verify KYC
                </Button>
              )}
            </Box>

            {/* Rest of profile content */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
