import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
} from "@mui/material";

const ProfileSection = ({ profile }) => {
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", my: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              alt={profile.name}
              src={profile.avatarUrl}
              sx={{ width: 60, height: 60 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">{profile.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.shopName}
            </Typography>
            <Typography variant="body2">{profile.email}</Typography>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary">
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
