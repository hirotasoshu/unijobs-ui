import { EmploymentType } from "../valueObjects/employmentType";
import { VacancyId } from "../valueObjects/id";
import { WorkFormat } from "../valueObjects/workformat";
import { EmployerViewModel } from "./employer";

export interface VacancyViewModel {
  id: VacancyId;
  title: string;
  salaryFrom?: number;
  salaryTo?: number;
  employer: EmployerViewModel;
}

export interface VacancyDetailViewModel extends VacancyViewModel {
  key_skills: string[];
  workFormat: WorkFormat;
  employmentType: EmploymentType;
  description: string;
  location: string;
}

export type VacancyFilters = {
  search?: string;
  page?: number;
  pageSize?: number;
  salaryFrom?: number;
  workFormat?: WorkFormat;
  employmentType?: EmploymentType;
};
