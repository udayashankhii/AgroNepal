import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Lock, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfileSection = () => {
  const [user, setUser] = useState(null);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Profile Information
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              value={user?.name || "Loading..."}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={user?.email || "Loading..."}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const AccountSettings = () => {
  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ProfileSection />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                <ListItem button component={Link} to="/profile">
                  <ListItemIcon>
                    <User size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Profile Settings" />
                </ListItem>
                <ListItem button component={Link} to="/security">
                  <ListItemIcon>
                    <Lock size={20} />
                  </ListItemIcon>
                  <ListItemText primary="Security" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountSettings;
