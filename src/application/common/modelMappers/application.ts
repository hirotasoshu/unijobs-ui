import { Application } from "../../../domain/entities/application";
import { ApplicationDetailViewModel } from "../models/application";

export class ApplicationMapper {
  static toEntity(dto: ApplicationDetailViewModel): Application {
    return new Application({
      id: dto.id,
      userId: dto.userId,
      vacancyId: dto.vacancy.id,
      coverLetter: dto.coverLetter,
      status: dto.status,
    });
  }
}
