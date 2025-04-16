import {
  VacancyDetailViewModel,
  VacancyFilters,
  VacancyViewModel,
} from "../../common/models/vacancy";
import { PaginatedResult } from "../common/paginatedResult";
import { VacancyId } from "../../../domain/valueObjects/id";

export interface VacancyGateway {
  getByFilters(
    filters: VacancyFilters,
  ): Promise<PaginatedResult<VacancyViewModel>>;
  getById(id: VacancyId): Promise<VacancyDetailViewModel>;
}
