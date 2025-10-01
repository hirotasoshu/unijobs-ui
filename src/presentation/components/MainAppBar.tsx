import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AuthMenu from "./AuthMenu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "ru", label: "🇷🇺 Русский" },
  { code: "en", label: "🇺🇸 English" },
  { code: "fr", label: "🇫🇷 Français" },
];

const normalize = (lng?: string | null) => {
  if (!lng) return "ru";
  return lng.split("-")[0]; // "ru-RU" -> "ru"
};

const MainAppBar = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const currentLang =
    normalize(i18n.language) ||
    (typeof window !== "undefined"
      ? normalize(localStorage.getItem("i18nextLng"))
      : "ru");

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    try {
      localStorage.setItem("i18nextLng", newLang);
    } catch (e) {
      /* noop */
    }
  };

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

        <Box sx={{ mr: 2 }}>
          <Select
            value={currentLang}
            onChange={handleChangeLanguage}
            size="small"
            sx={{
              color: "white",
              "& .MuiSvgIcon-root": { color: "white" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              minWidth: 120,
            }}
          >
            {LANGS.map((l) => (
              <MenuItem key={l.code} value={l.code}>
                {l.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <AuthMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainAppBar;
