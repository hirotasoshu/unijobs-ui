import {
  ApplicationDetailViewModel,
  ApplicationViewModel,
} from "../../../application/common/models/application";
import { PaginatedResult } from "../../../application/query/common/paginatedResult";
import { ApplicationGateway } from "../../../application/query/ports/applicationsGateway";
import { VacancyId } from "../../../domain/valueObjects/id";
import { AuthContextType } from "../../../application/auth/authContext";
import { VacancyViewModel } from "../../../application/common/models/vacancy";

export class HttpApplicationGateway implements ApplicationGateway {
  private baseUrl: string;
  constructor(baseUrl: string = "http://127.0.0.1:8000") {
    this.baseUrl = baseUrl;
  }

  async getUserApplications(
    authContext: AuthContextType,
    page: number = 1,
    pageSize: number = 10,
    lang?: string,
  ): Promise<PaginatedResult<ApplicationViewModel>> {
    const token = await authContext.getToken();
    const url = new URL("/users/me/applications", this.baseUrl);
    url.searchParams.set("page", String(page));
    url.searchParams.set("page_size", String(pageSize));
    const headers: HeadersInit = { Authorization: `Bearer ${token}` };
    if (lang) {
      headers["Accept-Language"] = lang;
    }

    const res = await fetch(url.toString(), { headers });

    if (!res.ok) {
      throw new Error(`Failed to fetch applications: ${res.status}`);
    }

    const data = await res.json();

    return {
      result: data.result.map((x: any) => this.mapApplication(x)),
      total: data.total,
      totalPages: data.total_pages,
    };
  }

  async getByVacancyId(
    id: VacancyId,
    authContext: AuthContextType,
    lang?: string,
  ): Promise<ApplicationDetailViewModel | null> {
    const token = await authContext.getToken();
    const headers: HeadersInit = { Authorization: `Bearer ${token}` };
    if (lang) {
      headers["Accept-Language"] = lang;
    }

    const res = await fetch(
      `${this.baseUrl}/users/me/applications/vacancies/${id}`,
      { headers },
    );

    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch application: ${res.status}`);
    }

    const x = await res.json();
    return this.mapApplicationDetail(x);
  }

  private mapVacancy(json: any): VacancyViewModel {
    return {
      id: json.id,
      title: json.title,
      salaryFrom: json.salary_from ?? undefined,
      salaryTo: json.salary_to ?? undefined,
      employer: {
        id: json.employer.id,
        name: json.employer.name,
        avatarUrl: json.employer.avatar_url,
      },
    };
  }

  private mapApplication(json: any): ApplicationViewModel {
    return {
      id: json.id,
      userId: json.user_id,
      vacancy: this.mapVacancy(json.vacancy),
      status: json.status,
      createdAt: new Date(json.created_at),
    };
  }

  private mapApplicationDetail(json: any): ApplicationDetailViewModel {
    return {
      ...this.mapApplication(json),
      coverLetter: json.cover_letter,
    };
  }
}
