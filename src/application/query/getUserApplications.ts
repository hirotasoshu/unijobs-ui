import { ApplicationViewModel } from "../common/models/application";
import { ApplicationGateway } from "./ports/applicationsGateway";
import { PaginatedResult } from "./common/paginatedResult";
import { AuthContextType } from "../auth/authContext";

export class GetUserApplications {
  constructor(private gateway: ApplicationGateway) {}

  async execute(
    authContext: AuthContextType,
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResult<ApplicationViewModel>> {
    if (!authContext.isAuthenticated) {
      throw new Error("Not authenticated");
    }
    if (page && page < 1) {
      throw new Error("Page must be >= 1");
    }

    return this.gateway.getUserApplications(authContext, page, pageSize);
  }
}
