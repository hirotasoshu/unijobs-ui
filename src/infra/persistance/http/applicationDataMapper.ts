import { Application } from "../../../domain/entities/application";
import { ApplicationId } from "../../../domain/valueObjects/id";
import { ApplicationDataMapper } from "../../../application/ports/dataMappers/application";
import { AuthContextType } from "../../../application/auth/authContext";

export class HttpApplicationDataMapper implements ApplicationDataMapper {
  private baseUrl: string;
  constructor(baseUrl: string = "http://127.0.0.1:8000") {
    this.baseUrl = baseUrl;
  }

  async insert(entity: Application, auth: AuthContextType): Promise<void> {
    const token = await auth.getToken();

    const body = {
      vacancy_id: entity.vacancyId,
      cover_letter: entity.coverLetter,
    };

    const res = await fetch(`${this.baseUrl}/users/me/applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(
        `Failed to insert application: ${res.status} ${res.statusText}`,
      );
    }
  }

  async update(
    id: ApplicationId,
    changes: Partial<Application>,
    auth: AuthContextType,
  ): Promise<void> {
    const token = await auth.getToken();

    const coverLetter =
      (changes as any)._coverLetter ?? (changes as any).coverLetter;

    if (coverLetter === undefined) {
      return;
    }

    const body = { cover_letter: coverLetter };

    const res = await fetch(`${this.baseUrl}/users/me/applications/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(
        `Failed to update application ${id}: ${res.status} ${res.statusText}`,
      );
    }
  }

  async delete(id: ApplicationId, auth: AuthContextType): Promise<void> {
    console.warn("delete() is not implemented yet for ApplicationDataMapper");
  }
}
