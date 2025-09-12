import { EmployerId } from "../../domain/valueObjects/id";
import { EmployerDetailViewModel } from "../common/models/employer";
import { EmployerGateway } from "./ports/employerGateway";

export class GetEmployerById {
  constructor(private gateway: EmployerGateway) {}

  async execute(id: EmployerId): Promise<EmployerDetailViewModel> {
    return this.gateway.getById(id);
  }
}
