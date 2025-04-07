import { VacancyGateway } from "../../domain/gateways/vacancyGateway";
import { VacancyFilters, VacancyViewModel } from "../../domain/models/vacancy";
import { PaginatedResult } from "../../domain/shared/paginatedResult";

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
