import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BusinessIcon from "@mui/icons-material/Business";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../application/auth/authContext";
import { ApplicationMapper } from "../../application/common/modelMappers/application";
import { VacancyDetailViewModel } from "../../application/common/models/vacancy";
import { GetUserApplicationForVacancy } from "../../application/query/getUserApplicationForVacancy";
import { GetVacancyById } from "../../application/query/getVacancyById";
import { ApplyForVacancyUseCase } from "../../application/usecase/applyForVacancy";
import { UpdateApplicationCoverLetter } from "../../application/usecase/updateApplicationCoverLetter";
import { Application } from "../../domain/entities/application";
import { HttpApplicationDataMapper } from "../../infra/persistance/http/applicationDataMapper";
import { HttpApplicationGateway } from "../../infra/persistance/http/applicationGateway";
import { HttpVacancyGateway } from "../../infra/persistance/http/vacancyGateway";
import { formatSalary } from "../shared/formatSalary";
import { useTranslation } from "react-i18next";

const vacancyGateway = new HttpVacancyGateway();
const applicationGateway = new HttpApplicationGateway();
const applicationDataMapper = new HttpApplicationDataMapper();

const getVacancyQuery = new GetVacancyById(vacancyGateway);
const getUserApplicationQuery = new GetUserApplicationForVacancy(
  applicationGateway,
);
const applyUseCase = new ApplyForVacancyUseCase(applicationDataMapper);
const updateCoverLetterUseCase = new UpdateApplicationCoverLetter(
  applicationDataMapper,
);

const VacancyPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const authContext = useAuth();

  const [vacancy, setVacancy] = useState<VacancyDetailViewModel | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const vacancyData = await getVacancyQuery.execute(id, i18n.language);
        setVacancy(vacancyData);

        if (authContext.isAuthenticated) {
          const appVm = await getUserApplicationQuery.execute(
            id,
            authContext,
            i18n.language,
          );
          if (appVm) {
            const entity = ApplicationMapper.toEntity(appVm);
            setApplication(entity);
            setCoverLetter(entity.coverLetter);
          } else {
            setApplication(null);
            setCoverLetter("");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, authContext.isAuthenticated, i18n.language]);

  if (!vacancy) return <Typography>{t("vacancy.loading")}</Typography>;

  const handleEmployerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/employers/${vacancy.employer.id}`);
  };

  const handleApply = async () => {
    if (!vacancy) return;
    const optimisticEntity = Application.createNew({
      vacancyId: vacancy.id,
      coverLetter,
    });
    setApplication(optimisticEntity);

    try {
      await applyUseCase.execute(vacancy.id, coverLetter, authContext);
    } catch (error) {
      console.error(error);
      setApplication(null);
    }
  };

  const handleUpdateCoverLetter = async () => {
    if (!application) return;

    const prevCoverLetter = application.coverLetter;
    const updatedEntity = new Application({
      id: application.id,
      vacancyId: application.vacancyId,
      coverLetter,
      status: application.status,
      userId: application.userId,
    });
    setApplication(updatedEntity);

    try {
      await updateCoverLetterUseCase.execute(
        application,
        coverLetter,
        authContext,
      );
    } catch (error) {
      console.error(error);
      setApplication(
        new Application({
          id: application.id,
          vacancyId: application.vacancyId,
          coverLetter: prevCoverLetter,
          status: application.status,
          userId: application.userId,
        }),
      );
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case "pending":
        return <Chip label={t("vacancy.status.pending")} color="warning" />;
      case "reviewed":
        return <Chip label={t("vacancy.status.reviewed")} color="info" />;
      case "accepted":
        return <Chip label={t("vacancy.status.accepted")} color="success" />;
      case "rejected":
        return <Chip label={t("vacancy.status.rejected")} color="error" />;
      default:
        return <Chip label={t("vacancy.status.unknown")} />;
    }
  };

  const isUpdateDisabled = application?.status !== "pending";

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

        <Typography
          variant="subtitle1"
          color="text.secondary"
          onClick={handleEmployerClick}
          sx={{
            mb: 2,
            display: "inline",
            "&:hover": { textDecoration: "underline", cursor: "pointer" },
          }}
        >
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
                {t("vacancy.salary")}:{" "}
                {formatSalary(vacancy.salaryFrom, vacancy.salaryTo)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <WorkOutlineIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                {t("vacancy.workFormat")}:{" "}
                {vacancy.workFormat === "onsite"
                  ? t("vacancy.workFormatOptions.onsite")
                  : vacancy.workFormat === "remote"
                    ? t("vacancy.workFormatOptions.remote")
                    : t("vacancy.workFormatOptions.hybrid")}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon sx={{ mr: 1 }} />
              <Typography variant="h6">
                {t("vacancy.employmentType")}:{" "}
                {vacancy.employmentType === "part-time"
                  ? t("vacancy.employmentTypeOptions.partTime")
                  : vacancy.employmentType === "full-time"
                    ? t("vacancy.employmentTypeOptions.fullTime")
                    : vacancy.employmentType === "internship"
                      ? t("vacancy.employmentTypeOptions.internship")
                      : t("vacancy.employmentTypeOptions.temporary")}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("vacancy.keySkills")}:
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

        {authContext.isAuthenticated ? (
          <>
            <TextField
              label={t("vacancy.coverLetter")}
              multiline
              fullWidth
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              sx={{ mb: 2 }}
            />

            {application ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isUpdateDisabled}
                onClick={handleUpdateCoverLetter}
              >
                {t("vacancy.updateCoverLetter")}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleApply}
              >
                {t("vacancy.apply")}
              </Button>
            )}

            {application && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {t("vacancy.applicationStatus")}:{" "}
                  {getStatusChip(application.status)}
                </Typography>
              </Box>
            )}
          </>
        ) : (
          <Typography
            variant="body1"
            color="error"
            align="center"
            sx={{ mt: 2 }}
          >
            {t("vacancy.authRequired")}
          </Typography>
        )}
      </Card>
    </Container>
  );
};

export default VacancyPage;
