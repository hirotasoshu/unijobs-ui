import { ApplicationId, UserId } from "../../../domain/valueObjects/id";
import { ApplicationStatus } from "../../../domain/valueObjects/applicationStatus";
import { VacancyViewModel } from "./vacancy";

export interface ApplicationViewModel {
  id: ApplicationId;
  userId: UserId;
  vacancy: VacancyViewModel;
  status: ApplicationStatus;
  createdAt: Date;
}

export interface ApplicationDetailViewModel extends ApplicationViewModel {
  coverLetter: string;
}
