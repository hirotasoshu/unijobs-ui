import {
  ApplicationDetailViewModel,
  ApplicationViewModel,
} from "../../common/models/application.ts";
import { PaginatedResult } from "../common/paginatedResult";
import { VacancyId } from "../../../domain/valueObjects/id";
import { AuthContextType } from "../../auth/authContext.tsx";

export interface ApplicationGateway {
  getUserApplications(
    authContext: AuthContextType,
    page?: number,
    pageSize?: number,
    lang?: string,
  ): Promise<PaginatedResult<ApplicationViewModel>>;
  getByVacancyId(
    id: VacancyId,
    authContext: AuthContextType,
    lang?: string,
  ): Promise<ApplicationDetailViewModel | null>;
}
