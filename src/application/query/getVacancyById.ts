import { VacancyId } from "../../domain/valueObjects/id";
import { VacancyDetailViewModel } from "../common/models/vacancy";
import { VacancyGateway } from "./ports/vacancyGateway";

export class GetVacancyById {
  constructor(private gateway: VacancyGateway) {}

  async execute(id: VacancyId): Promise<VacancyDetailViewModel> {
    return this.gateway.getById(id);
  }
}
