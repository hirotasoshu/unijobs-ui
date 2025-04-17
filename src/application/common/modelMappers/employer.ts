import { Employer } from "../../../domain/entities/employer";
import { EmployerDetailViewModel } from "../models/employer";
export class EmployerMapper {
  static toEntity(dto: EmployerDetailViewModel): Employer {
    return new Employer({
      id: dto.id,
      name: dto.name,
      avatarUrl: dto.avatarUrl,
      description: dto.description,
    });
  }
}
