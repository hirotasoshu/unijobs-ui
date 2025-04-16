import { EmployerId } from "../../../domain/valueObjects/id";

export interface EmployerViewModel {
  id: EmployerId;
  name: string;
  avatarUrl: string;
}

export interface EmployerDetailViewModel extends EmployerViewModel {
  description: string;
}
