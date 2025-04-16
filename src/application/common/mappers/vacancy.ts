import { Vacancy } from "../../../domain/entities/vacancy";
import { VacancyDetailViewModel } from "../models/vacancy";
export class VacancyMapper {
  static toEntity(dto: VacancyDetailViewModel): Vacancy {
    return new Vacancy({
      id: dto.id,
      title: dto.title,
      salaryFrom: dto.salaryFrom,
      salaryTo: dto.salaryTo,
      description: dto.description,
      location: dto.location,
      keySkills: dto.key_skills,
      workFormat: dto.workFormat,
      employmentType: dto.employmentType,
      employerId: dto.employer.id,
    });
  }
}
