import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetVacancyById } from "../../application/query/getVacancyById";
import { VacancyDetailViewModel } from "../../application/common/models/vacancy";
import { DummyVacancyGateway } from "../../infra/adapters/persistance/dummy/vacancyAdapter";
import { formatSalary } from "../shared/formatSalary";

const gateway = new DummyVacancyGateway();
const useCase = new GetVacancyById(gateway);

const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<VacancyDetailViewModel | null>(null);

  useEffect(() => {
    if (id) {
      useCase.execute(id).then(setVacancy);
    }
  }, [id]);

  if (!vacancy) return <Typography>Загрузка...</Typography>;

  return (
    <Container sx={{ mt: 6 }}>
      <Card sx={{ display: "flex", flexDirection: "column", p: 3 }}>
        <CardMedia
          component="img"
          alt={vacancy.employer.name}
          height="140"
          image={vacancy.employer.avatarUrl}
          sx={{
            borderRadius: "50%",
            width: 100,
            marginBottom: 2,
            alignSelf: "center",
          }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          {vacancy.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          <BusinessIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          {vacancy.employer.name} • {vacancy.location}
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 2 }}>
          {vacancy.description}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CurrencyRubleIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Зарплата: {formatSalary(vacancy.salaryFrom, vacancy.salaryTo)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WorkOutlineIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Формат работы:{" "}
                {vacancy.workFormat === "onsite"
                  ? "Офис"
                  : vacancy.workFormat === "remote"
                    ? "Удалёнка"
                    : "Гибрид"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                Тип занятости:{" "}
                {vacancy.employmentType === "part-time"
                  ? "Частичная занятость"
                  : vacancy.employmentType === "full-time"
                    ? "Полная занятость"
                    : vacancy.employmentType == "internship"
                      ? "Стажировка"
                      : "Подработка"}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Ключевые навыки:
        </Typography>
        <Box sx={{ mb: 3 }}>
          {vacancy.key_skills.map((skill, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                display: "inline-block",
                mr: 2,
                mb: 1,
                p: 1,
                backgroundColor: "#f4f4f4",
                borderRadius: 2,
              }}
            >
              {skill}
            </Typography>
          ))}
        </Box>

        <Button variant="contained" color="primary" fullWidth>
          Откликнуться
        </Button>
      </Card>
    </Container>
  );
};

export default VacancyPage;
