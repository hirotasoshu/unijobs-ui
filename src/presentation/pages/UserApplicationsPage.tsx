import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../application/auth/authContext";
import { HttpApplicationGateway } from "../../infra/persistance/http/applicationGateway";
import { GetUserApplications } from "../../application/query/getUserApplications";
import { ApplicationViewModel } from "../../application/common/models/application";

const applicationGateway = new HttpApplicationGateway();
const getUserApplicationsQuery = new GetUserApplications(applicationGateway);

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "warning";
    case "reviewed":
      return "info";
    case "accepted":
      return "success";
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

const UserApplicationsPage = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const [applications, setApplications] = useState<ApplicationViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 5;

  const loadApplications = async (pageNumber: number) => {
    if (!authContext.isAuthenticated) return;
    setLoading(true);
    try {
      const result = await getUserApplicationsQuery.execute(
        authContext,
        pageNumber,
        pageSize,
        i18n.language,
      );
      setApplications(result.result);
      setTotalPages(result.totalPages);
      setPage(pageNumber);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications(1);
  }, [authContext.isAuthenticated, i18n.language]);

  if (loading) return <Typography>{t("vacancy.loading")}</Typography>;

  if (!authContext.isAuthenticated) {
    return (
      <Typography color="error" align="center">
        {t("userApplications.authRequired")}
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        {t("userApplications.title")}
      </Typography>
      <Grid container spacing={3}>
        {applications.map((app) => (
          <Grid item xs={12} md={6} key={app.id}>
            <Card
              sx={{ display: "flex", cursor: "pointer" }}
              onClick={() => navigate(`/vacancies/${app.vacancy.id}`)}
            >
              <CardMedia
                component="img"
                image={app.vacancy.employer.avatarUrl}
                alt={app.vacancy.employer.name}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  m: 1,
                  borderRadius: "50%",
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{app.vacancy.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {app.vacancy.employer.name}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip
                    label={t(`vacancy.status.${app.status}`)}
                    color={getStatusColor(app.status)}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => loadApplications(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default UserApplicationsPage;
