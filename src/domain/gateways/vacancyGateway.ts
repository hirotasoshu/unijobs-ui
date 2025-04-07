import {
  VacancyDetailViewModel,
  VacancyFilters,
  VacancyViewModel,
} from "../models/vacancy";
import { PaginatedResult } from "../shared/paginatedResult";
import { VacancyId } from "../valueObjects/id";

export interface VacancyGateway {
  getByFilters(
    filters: VacancyFilters,
  ): Promise<PaginatedResult<VacancyViewModel>>;
  getById(id: VacancyId): Promise<VacancyDetailViewModel>;
}
