import { VacancyId } from "../../domain/valueObjects/id";
import { AuthContextType } from "../auth/authContext";
import { ApplicationDataMapper } from "../ports/dataMappers/application";
import { UnitOfWork } from "../common/uow";
import { Application } from "../../domain/entities/application";

export class ApplyForVacancyUseCase {
  constructor(private mapper: ApplicationDataMapper) {}

  async execute(
    vacancyId: VacancyId,
    coverLetter: string,
    authContext: AuthContextType,
  ): Promise<void> {
    if (!authContext.isAuthenticated) {
      throw new Error("Not authenticated");
    }
    const uow = new UnitOfWork();
    uow.registerMapper(Application, this.mapper);

    const application = Application.createNew({
      vacancyId,
      coverLetter,
    });
    uow.registerNew(application);
    await uow.commit(authContext);
  }
}
