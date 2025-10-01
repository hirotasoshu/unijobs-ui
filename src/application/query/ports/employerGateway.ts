import { EmployerDetailViewModel } from "../../common/models/employer";
import { EmployerId } from "../../../domain/valueObjects/id";

export interface EmployerGateway {
  getById(id: EmployerId, lang?: string): Promise<EmployerDetailViewModel>;
}
