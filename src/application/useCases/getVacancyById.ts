import { VacancyGateway } from "../../domain/gateways/vacancyGateway";
import { VacancyDetailViewModel } from "../../domain/models/vacancy";
import { VacancyId } from "../../domain/valueObjects/id";

export class GetVacancyById {
  constructor(private gateway: VacancyGateway) {}

  async execute(id: VacancyId): Promise<VacancyDetailViewModel> {
    return this.gateway.getById(id);
  }
}
