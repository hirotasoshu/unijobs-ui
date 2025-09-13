import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import AuthMenu from "./AuthMenu";
import { useNavigate } from "react-router-dom";

const MainAppBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          UniJob
        </Typography>
        <Box>
          <AuthMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
