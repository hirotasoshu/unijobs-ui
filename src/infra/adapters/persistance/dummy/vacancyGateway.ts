import {
  VacancyDetailViewModel,
  VacancyFilters,
  VacancyViewModel,
} from "../../../../application/common/models/vacancy";
import { PaginatedResult } from "../../../../application/query/common/paginatedResult";
import { VacancyGateway } from "../../../../application/query/ports/vacancyGateway";
import { mockVacancies } from "./mocks/vacancies";
import { VacancyId } from "../../../../domain/valueObjects/id";

const VACANCIES_KEY = "vacancies";

export class DummyVacancyGateway implements VacancyGateway {
  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(VACANCIES_KEY)) {
      localStorage.setItem(VACANCIES_KEY, JSON.stringify(mockVacancies));
    }
  }
  private getVacancies(): VacancyDetailViewModel[] {
    return JSON.parse(localStorage.getItem(VACANCIES_KEY)) || [];
  }

  async getByFilters(
    filters: VacancyFilters = {},
  ): Promise<PaginatedResult<VacancyViewModel>> {
    const {
      search = "",
      page = 1,
      pageSize = 10,
      salaryFrom,
      workFormat,
      employmentType,
      employerId,
    } = filters;

    const term = search.toLowerCase();
    const vacancies = this.getVacancies();

    const filtered = vacancies.filter((vacancy) => {
      const matchesSearch =
        vacancy.title.toLowerCase().includes(term) ||
        vacancy.employer.name.toLowerCase().includes(term) ||
        vacancy.key_skills.some((skill) => skill.toLowerCase().includes(term));

      const matchesSalary =
        salaryFrom == null ||
        (vacancy.salaryFrom && vacancy.salaryFrom >= salaryFrom);

      const matchesWorkFormat =
        workFormat == null || vacancy.workFormat === workFormat;

      const matchesEmploymentType =
        employmentType == null || vacancy.employmentType === employmentType;

      const matchesEmployerId =
        employerId == null || vacancy.employer.id === employerId;

      return (
        matchesSearch &&
        matchesSalary &&
        matchesWorkFormat &&
        matchesEmploymentType &&
        matchesEmployerId
      );
    });

    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    const result = paginated.map((vacancy) => ({
      id: vacancy.id,
      title: vacancy.title,
      location: vacancy.location,
      salaryFrom: vacancy.salaryFrom,
      salaryTo: vacancy.salaryTo,
      employer: vacancy.employer,
    }));
    const total = filtered.length;
    const totalPages = Math.ceil(filtered.length / pageSize);

    return { result: result, total: total, totalPages: totalPages };
  }

  async getById(id: VacancyId): Promise<VacancyDetailViewModel> {
    return this.getVacancies().find((v) => v.id === id)!;
  }
}
