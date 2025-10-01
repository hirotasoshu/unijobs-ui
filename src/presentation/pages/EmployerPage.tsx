import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EmployerDetailViewModel } from "../../application/common/models/employer";
import { VacancyViewModel } from "../../application/common/models/vacancy";
import { PaginatedResult } from "../../application/query/common/paginatedResult";
import { GetEmployerById } from "../../application/query/getEmployerById";
import { GetVacanciesByFilters } from "../../application/query/getVacanciesByFilters";
import { HttpEmployerGateway } from "../../infra/persistance/http/employerGateway";
import { HttpVacancyGateway } from "../../infra/persistance/http/vacancyGateway";
import VacancyCard from "../components/VacancyCard";
import { useTranslation } from "react-i18next";

export const EmployerPage = () => {
  const { i18n, t } = useTranslation();
  const { employerId } = useParams<{ employerId: string }>();
  const [employer, setEmployer] = useState<EmployerDetailViewModel | null>(
    null,
  );
  const [vacancies, setVacancies] = useState<PaginatedResult<VacancyViewModel>>(
    { result: [], total: 0, totalPages: 1 },
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const employerGateway = new HttpEmployerGateway();
  const vacancyGateway = new HttpVacancyGateway();
  const getEmployerQuery = new GetEmployerById(employerGateway);
  const getVacanciesQuery = new GetVacanciesByFilters(vacancyGateway);

  const fetchEmployer = async () => {
    try {
      const data = await getEmployerQuery.execute(employerId!, i18n.language);
      setEmployer(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("employer.unknownError"));
    }
  };

  const fetchVacancies = async () => {
    try {
      setLoading(true);
      const data = await getVacanciesQuery.execute({
        employerId,
        page,
        pageSize,
        lang: i18n.language,
      });
      setVacancies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("employer.unknownError"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployer();
    fetchVacancies();
  }, [employerId, page, i18n.language]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box mt={4} textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  if (!employer)
    return (
      <Box mt={4} textAlign="center">
        <Typography>{t("employer.notFound")}</Typography>
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          src={employer.avatarUrl}
          sx={{ width: 120, height: 120, mr: 3 }}
        />
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            {employer.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {employer.description}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        {t("employer.vacancies")}
      </Typography>

      <Stack spacing={2}>
        {vacancies.result.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </Stack>

      {vacancies.total > pageSize && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={vacancies.totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
