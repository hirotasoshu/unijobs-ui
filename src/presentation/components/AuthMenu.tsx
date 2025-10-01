import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useAuth } from "../../application/auth/authContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AuthMenu = () => {
  const { isAuthenticated, username, login, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={login}
        style={{
          color: "white",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {t("login")}
      </button>
    );
  }

  return (
    <>
      <Tooltip title={t("account")}>
        <IconButton color="inherit" onClick={handleOpen}>
          <Avatar>{username?.[0].toUpperCase()}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled>
          <ListItemText primary={username} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/applications");
          }}
        >
          {t("myApplications")}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          {t("logout")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AuthMenu;
