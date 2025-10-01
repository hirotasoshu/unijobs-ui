import {
  VacancyDetailViewModel,
  VacancyFilters,
  VacancyViewModel,
} from "../../../application/common/models/vacancy";
import { PaginatedResult } from "../../../application/query/common/paginatedResult";
import { VacancyGateway } from "../../../application/query/ports/vacancyGateway";
import { VacancyId } from "../../../domain/valueObjects/id";

export class HttpVacancyGateway implements VacancyGateway {
  private baseUrl: string;

  constructor(baseUrl: string = "http://127.0.0.1:8000/vacancies") {
    this.baseUrl = baseUrl;
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
      lang,
    } = filters;

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("page_size", pageSize.toString());

    if (search) params.append("search", search);
    if (salaryFrom) params.append("salary_from", salaryFrom.toString());
    if (workFormat) params.append("work_format", workFormat);
    if (employmentType) params.append("employment_type", employmentType);
    if (employerId) params.append("employer_id", employerId);

    const headers: HeadersInit = {};
    if (lang) {
      headers["Accept-Language"] = lang;
    }

    const response = await fetch(`${this.baseUrl}?${params}`, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();

    const result = responseJson.result.map((vacancy) => ({
      id: vacancy.id,
      title: vacancy.title,
      location: vacancy.location,
      salaryFrom: vacancy.salary_from,
      salaryTo: vacancy.salary_to,
      employer: {
        id: vacancy.employer.id,
        name: vacancy.employer.name,
        avatarUrl: vacancy.employer.avatar_url,
      },
    }));

    return {
      result,
      total: responseJson.total,
      totalPages: responseJson.total_pages,
    };
  }

  async getById(id: VacancyId, lang?: string): Promise<VacancyDetailViewModel> {
    const headers: HeadersInit = {};
    if (lang) {
      headers["Accept-Language"] = lang;
    }
    const response = await fetch(`${this.baseUrl}/${id}`, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();
    return {
      id: responseJson.id,
      title: responseJson.title,
      salaryFrom: responseJson.salary_from,
      salaryTo: responseJson.salary_to,
      employer: {
        id: responseJson.employer.id,
        name: responseJson.employer.name,
        avatarUrl: responseJson.employer.avatar_url,
      },
      key_skills: responseJson.key_skills,
      workFormat: responseJson.work_format,
      employmentType: responseJson.employment_type,
      description: responseJson.description,
      location: responseJson.location,
    };
  }
}
