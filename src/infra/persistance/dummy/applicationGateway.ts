import {
  ApplicationDetailViewModel,
  ApplicationViewModel,
} from "../../../application/common/models/application";
import { PaginatedResult } from "../../../application/query/common/paginatedResult";
import { ApplicationGateway } from "../../../application/query/ports/applicationsGateway";
import { VacancyId } from "../../../domain/valueObjects/id";
import { AuthContextType } from "../../../application/auth/authContext";

const APPLICATIONS_KEY = "applications";

export class DummyApplicationGateway implements ApplicationGateway {
  constructor() {
    this.initializeStorage();
  }

  private initializeStorage(): void {
    if (!localStorage.getItem(APPLICATIONS_KEY)) {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify([]));
    }
  }

  private getApplications(): ApplicationDetailViewModel[] {
    return JSON.parse(localStorage.getItem(APPLICATIONS_KEY) || "[]");
  }

  async getUserApplications(
    authContext: AuthContextType,
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResult<ApplicationViewModel>> {
    const all = this.getApplications().filter(
      (a) => a.userId === authContext.userId,
    );

    const total = all.length;
    const totalPages = Math.ceil(total / pageSize);

    const start = (page - 1) * pageSize;
    const paginated = all.slice(start, start + pageSize);

    const result: ApplicationViewModel[] = paginated.map(
      ({ id, userId, vacancy, status, createdAt }) => ({
        id,
        userId,
        vacancy,
        status,
        createdAt,
      }),
    );

    return { result, total, totalPages };
  }

  async getByVacancyId(
    id: VacancyId,
    authContext: AuthContextType,
  ): Promise<ApplicationDetailViewModel | null> {
    return (
      this.getApplications().find(
        (a) => a.vacancy.id === id && a.userId === authContext.userId,
      ) ?? null
    );
  }
}
