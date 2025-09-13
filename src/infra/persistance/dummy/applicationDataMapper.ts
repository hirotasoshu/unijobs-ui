import { Application } from "../../../domain/entities/application";
import { ApplicationId } from "../../../domain/valueObjects/id";
import { ApplicationDataMapper } from "../../../application/ports/dataMappers/application";
import { ApplicationDetailViewModel } from "../../../application/common/models/application";
import { AuthContextType } from "../../../application/auth/authContext";
import { v4 as uuidv4 } from "uuid";

const APPLICATIONS_KEY = "applications";
const VACANCIES_KEY = "vacancies";

export class DummyApplicationDataMapper implements ApplicationDataMapper {
  private loadApplications(): ApplicationDetailViewModel[] {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private saveApplications(applications: ApplicationDetailViewModel[]) {
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
  }

  private loadVacancies(): any[] {
    const raw = localStorage.getItem(VACANCIES_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private mapVacancy(detail: any) {
    return {
      id: detail.id,
      title: detail.title,
      salaryFrom: detail.salaryFrom,
      salaryTo: detail.salaryTo,
      employer: detail.employer,
    };
  }

  private mapToDetailViewModel(
    entity: Application,
    auth: AuthContextType,
  ): ApplicationDetailViewModel {
    const userId = entity.userId ?? auth.userId!;
    const vacancies = this.loadVacancies();
    const vacancyDetail = vacancies.find((v) => v.id === entity.vacancyId)!;

    return {
      id: entity.id ?? uuidv4(),
      userId: userId,
      vacancy: this.mapVacancy(vacancyDetail),
      status: entity.status,
      coverLetter: entity.coverLetter,
      createdAt: new Date(),
    };
  }

  async insert(entity: Application, auth: AuthContextType): Promise<void> {
    const all = this.loadApplications();
    const dto = this.mapToDetailViewModel(entity, auth);
    all.push(dto);
    this.saveApplications(all);
  }

  async update(
    id: ApplicationId,
    changes: Partial<Application>,
    auth: AuthContextType,
  ): Promise<void> {
    // # TODO: ADD NORMALIZATION TO UOW SIDE
    const all = this.loadApplications();
    const index = all.findIndex((a) => a.id === id);
    if (index < 0) return;

    const current = all[index];

    const normalized: Record<string, any> = {};
    for (const rawKey in changes as any) {
      if (!Object.prototype.hasOwnProperty.call(changes, rawKey)) continue;
      const val = (changes as any)[rawKey];
      const key = rawKey.startsWith("_") ? rawKey.slice(1) : rawKey;
      normalized[key] = val;
    }

    const userId = normalized.userId ?? current.userId ?? auth.userId!;

    let vacancy = current.vacancy;
    if (normalized.vacancyId) {
      const vacancies = this.loadVacancies();
      const vacancyDetail = vacancies.find(
        (v) => v.id === normalized.vacancyId,
      );
      if (vacancyDetail) {
        vacancy = this.mapVacancy(vacancyDetail);
      }
    }

    const updated: ApplicationDetailViewModel = {
      ...current,
      userId,
      vacancy,
      coverLetter: normalized.coverLetter ?? current.coverLetter,
      status: normalized.status ?? current.status,
      createdAt: current.createdAt,
      id: current.id,
    };

    all[index] = updated;
    this.saveApplications(all);
  }

  async delete(id: ApplicationId, authContext: AuthContextType): Promise<void> {
    const all = this.loadApplications();
    const application = all.find((a) => a.id === id)!;
    if (application.userId !== authContext.userId) {
      new Error("Unauthorized");
    }
    this.saveApplications(all.filter((a) => a.id !== id));
  }
}
