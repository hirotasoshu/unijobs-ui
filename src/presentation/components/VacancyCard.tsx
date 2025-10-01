import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { VacancyViewModel } from "../../application/common/models/vacancy";
import { formatSalary } from "../shared/formatSalary";

interface Props {
  vacancy: VacancyViewModel;
}

const VacancyCard = ({ vacancy }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEmployerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/employers/${vacancy.employer.id}`);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            src={vacancy.employer.avatarUrl}
            alt={vacancy.employer.name}
            sx={{ width: 56, height: 56 }}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <div>
                <Typography variant="h6">{vacancy.title}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  onClick={handleEmployerClick}
                  sx={{
                    display: "inline",
                    "&:hover": {
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                >
                  {vacancy.employer.name}
                </Typography>
              </div>

              <Chip
                label={formatSalary(vacancy.salaryFrom, vacancy.salaryTo)}
                color="primary"
                variant="outlined"
                sx={{
                  fontSize: "1rem",
                  padding: "0.5rem",
                  minWidth: "120px",
                }}
              />
            </Stack>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/vacancies/${vacancy.id}`)}
                size="small"
              >
                {t("vacancy.details")}
              </Button>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VacancyCard;
