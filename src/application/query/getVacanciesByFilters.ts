import { VacancyGateway } from "./ports/vacancyGateway";
import { PaginatedResult } from "./common/paginatedResult";
import { VacancyViewModel, VacancyFilters } from "../common/models/vacancy";

export class GetVacanciesByFilters {
  constructor(private gateway: VacancyGateway) {}

  async execute(
    filters: VacancyFilters,
  ): Promise<PaginatedResult<VacancyViewModel>> {
    if (filters.page && filters.page < 1) {
      throw new Error("Page must be >= 1");
    }

    return this.gateway.getByFilters(filters);
  }
}
