import { EmployerDetailViewModel } from "../../../application/common/models/employer";
import { EmployerGateway } from "../../../application/query/ports/employerGateway";
import { EmployerId } from "../../../domain/valueObjects/id";

export class HttpEmployerGateway implements EmployerGateway {
  private baseUrl: string;

  constructor(baseUrl: string = "http://127.0.0.1:8000/employers") {
    this.baseUrl = baseUrl;
  }

  async getById(
    id: EmployerId,
    lang?: string,
  ): Promise<EmployerDetailViewModel> {
    const headers: HeadersInit = {};
    if (lang) {
      headers["Accept-Language"] = lang;
    }
    const response = await fetch(`${this.baseUrl}/${id}`, { headers });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();
    return {
      id: responseJson.id,
      name: responseJson.name,
      avatarUrl: responseJson.avatar_url,
      description: responseJson.description,
    };
  }
}
