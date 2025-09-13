import { AuthContextType } from "../auth/authContext";
import { ApplicationDataMapper } from "../ports/dataMappers/application";
import { UnitOfWork } from "../common/uow";
import { Application } from "../../domain/entities/application";

export class UpdateApplicationCoverLetter {
  constructor(private mapper: ApplicationDataMapper) {}

  async execute(
    application: Application,
    newCoverLetter: string,
    authContext: AuthContextType,
  ): Promise<void> {
    if (!authContext.isAuthenticated) {
      throw new Error("Not authenticated");
    }
    const uow = new UnitOfWork();
    uow.registerMapper(Application, this.mapper);
    uow.registerDirty(application);

    application.coverLetter = newCoverLetter;

    await uow.commit(authContext);
  }
}
