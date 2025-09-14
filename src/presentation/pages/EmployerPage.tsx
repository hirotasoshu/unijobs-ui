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
import { DummyEmployerGateway } from "../../infra/persistance/dummy/employerGateway";
import { HttpEmployerGateway } from "../../infra/persistance/http/employerGateway";
import { DummyVacancyGateway } from "../../infra/persistance/dummy/vacancyGateway";
import VacancyCard from "../components/VacancyCard";

export const EmployerPage = () => {
  const { employerId } = useParams<{ employerId: string }>();
  const [employer, setEmployer] = useState<EmployerDetailViewModel | null>(
    null,
  );
  const [vacancies, setVacancies] = useState<PaginatedResult<VacancyViewModel>>(
    {
      result: [],
      total: 0,
      totalPages: 1,
    },
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // const employerGateway = new DummyEmployerGateway();
  const employerGateway = new HttpEmployerGateway();
  const vacancyGateway = new DummyVacancyGateway();
  const getEmployerQuery = new GetEmployerById(employerGateway);
  const getVacanciesQuery = new GetVacanciesByFilters(vacancyGateway);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const employerData = await getEmployerQuery.execute(employerId!);
        setEmployer(employerData);

        const vacanciesData = await getVacanciesQuery.execute({
          employerId: employerId,
          page: page,
          pageSize: pageSize,
        });
        setVacancies(vacanciesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employerId, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!employer) {
    return (
      <Box mt={4} textAlign="center">
        <Typography>Работодатель не найден</Typography>
      </Box>
    );
  }

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
        Вакансии компании
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
