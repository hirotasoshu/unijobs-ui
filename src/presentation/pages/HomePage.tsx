import { Clear } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  VacancyFilters,
  VacancyViewModel,
} from "../../application/common/models/vacancy";
import { GetVacanciesByFilters } from "../../application/query/getVacanciesByFilters";
import { EmploymentType } from "../../domain/valueObjects/employmentType";
import { WorkFormat } from "../../domain/valueObjects/workformat";
import { HttpVacancyGateway } from "../../infra/persistance/http/vacancyGateway";
import VacancyCard from "../components/VacancyCard";

const PAGE_SIZE = 5;

const HomePage = () => {
  const { i18n, t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [salaryFrom, setSalaryFrom] = useState<number | undefined>(undefined);
  const [workFormat, setWorkFormat] = useState<WorkFormat | undefined>(
    undefined,
  );
  const [employmentType, setEmploymentType] = useState<
    EmploymentType | undefined
  >(undefined);
  const [vacanciesData, setVacanciesData] = useState<{
    result: VacancyViewModel[];
    total: number;
    totalPages: number;
  }>({ result: [], total: 0, totalPages: 0 });

  // const gateway = new DummyVacancyGateway();
  const gateway = new HttpVacancyGateway();
  const getVacanciesUseCase = new GetVacanciesByFilters(gateway);

  const fetchVacancies = useCallback(() => {
    const filters: VacancyFilters = {
      search: searchTerm,
      page,
      pageSize: PAGE_SIZE,
      salaryFrom,
      workFormat,
      employmentType,
      lang: i18n.language,
    };
    getVacanciesUseCase.execute(filters).then((data) => {
      setVacanciesData(data);
    });
  }, [searchTerm, page, salaryFrom, workFormat, employmentType, i18n.language]);

  useEffect(() => {
    fetchVacancies();
  }, [fetchVacancies]);

  // обновление данных при смене языка без сброса страницы
  useEffect(() => {
    const handleLangChange = () => {
      fetchVacancies();
    };
    i18n.on("languageChanged", handleLangChange);
    return () => i18n.off("languageChanged", handleLangChange);
  }, [i18n, fetchVacancies]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSalaryFrom(undefined);
    setWorkFormat(undefined);
    setEmploymentType(undefined);
    setPage(1);
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1">
          {t("home.availableVacancies")}
        </Typography>

        <TextField
          label={t("home.searchPlaceholder")}
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          InputProps={{
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchTerm("")}>
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label={t("home.salaryFrom")}
              variant="outlined"
              type="number"
              fullWidth
              value={salaryFrom ?? ""}
              onChange={(e) =>
                setSalaryFrom(
                  e.target.value ? parseInt(e.target.value) : undefined,
                )
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₽</InputAdornment>
                ),
                endAdornment: salaryFrom !== undefined && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSalaryFrom(undefined)}>
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 180 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" sx={{ minWidth: 180 }}>
              <InputLabel>{t("home.workFormat")}</InputLabel>
              <Select
                value={workFormat ?? ""}
                onChange={(e) =>
                  setWorkFormat(
                    e.target.value ? (e.target.value as WorkFormat) : undefined,
                  )
                }
                label={t("home.workFormat")}
                renderValue={(selected) =>
                  selected
                    ? selected === "onsite"
                      ? t("home.workFormatOptions.onsite")
                      : selected === "remote"
                        ? t("home.workFormatOptions.remote")
                        : t("home.workFormatOptions.hybrid")
                    : t("home.workFormat")
                }
                sx={{
                  "& .MuiSelect-select": {
                    minHeight: "1.4375em",
                    minWidth: "120px !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": { minWidth: 180 },
                }}
                endAdornment={
                  workFormat && (
                    <InputAdornment position="end" sx={{ mr: 1 }}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setWorkFormat(undefined);
                        }}
                        edge="end"
                        size="small"
                      >
                        <Clear fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              >
                <MenuItem value="onsite">
                  {t("home.workFormatOptions.onsite")}
                </MenuItem>
                <MenuItem value="remote">
                  {t("home.workFormatOptions.remote")}
                </MenuItem>
                <MenuItem value="hybrid">
                  {t("home.workFormatOptions.hybrid")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" sx={{ minWidth: 180 }}>
              <InputLabel>{t("home.employmentType")}</InputLabel>
              <Select
                value={employmentType ?? ""}
                onChange={(e) =>
                  setEmploymentType(
                    e.target.value
                      ? (e.target.value as EmploymentType)
                      : undefined,
                  )
                }
                label={t("home.employmentType")}
                renderValue={(selected) =>
                  selected
                    ? selected === "part-time"
                      ? t("home.employmentTypeOptions.partTime")
                      : selected === "full-time"
                        ? t("home.employmentTypeOptions.fullTime")
                        : selected === "internship"
                          ? t("home.employmentTypeOptions.internship")
                          : t("home.employmentTypeOptions.temporary")
                    : t("home.employmentType")
                }
                sx={{
                  "& .MuiSelect-select": {
                    minHeight: "1.4375em",
                    minWidth: "120px !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": { minWidth: 180 },
                }}
                endAdornment={
                  employmentType && (
                    <InputAdornment position="end" sx={{ mr: 1 }}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setEmploymentType(undefined);
                        }}
                        edge="end"
                        size="small"
                      >
                        <Clear fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              >
                <MenuItem value="part-time">
                  {t("home.employmentTypeOptions.partTime")}
                </MenuItem>
                <MenuItem value="full-time">
                  {t("home.employmentTypeOptions.fullTime")}
                </MenuItem>
                <MenuItem value="internship">
                  {t("home.employmentTypeOptions.internship")}
                </MenuItem>
                <MenuItem value="temporary">
                  {t("home.employmentTypeOptions.temporary")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleClearFilters}
              sx={{ height: "56px", minWidth: 180 }}
            >
              {t("home.clearFilters")}
            </Button>
          </Grid>
        </Grid>

        <Stack spacing={2}>
          {vacanciesData.result.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </Stack>

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={vacanciesData.totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default HomePage;
