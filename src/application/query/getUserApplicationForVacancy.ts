import { ApplicationDetailViewModel } from "../common/models/application";
import { ApplicationGateway } from "./ports/applicationsGateway";
import { VacancyId } from "../../domain/valueObjects/id";
import { AuthContextType } from "../auth/authContext";

export class GetUserApplicationForVacancy {
  constructor(private gateway: ApplicationGateway) {}

  async execute(
    vacancyId: VacancyId,
    authContext: AuthContextType,
  ): Promise<ApplicationDetailViewModel | null> {
    if (!authContext.isAuthenticated) {
      throw new Error("Not authenticated");
    }

    return this.gateway.getByVacancyId(vacancyId, authContext);
  }
}
