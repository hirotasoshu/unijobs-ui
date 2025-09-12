import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import AuthMenu from "./AuthMenu";

const MainAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          UniJobs
        </Typography>
        <Box>
          <AuthMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
