import { EmployerDetailViewModel } from "../../../../application/common/models/employer";
import { EmployerGateway } from "../../../../application/query/ports/employerGateway";
import { mockEmployers } from "./mocks/employers";
import { EmployerId } from "../../../../domain/valueObjects/id";

const EMPLOYERS_KEY = "employers";

export class DummyEmployerGateway implements EmployerGateway {
  constructor() {
    this.initializeStorage();
  }
  private initializeStorage(): void {
    if (!localStorage.getItem(EMPLOYERS_KEY)) {
      localStorage.setItem(EMPLOYERS_KEY, JSON.stringify(mockEmployers));
    }
  }
  private getEmployers(): EmployerDetailViewModel[] {
    return JSON.parse(localStorage.getItem(EMPLOYERS_KEY)) || [];
  }

  async getById(id: EmployerId): Promise<EmployerDetailViewModel> {
    return this.getEmployers().find((e) => e.id === id)!;
  }
}
