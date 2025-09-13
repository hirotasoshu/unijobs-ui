import { ApplicationId, UserId, VacancyId } from "../valueObjects/id";
import { ApplicationStatus } from "../valueObjects/applicationStatus";
import { Entity } from "./base";

export class Application extends Entity<ApplicationId> {
  private _userId?: UserId;
  private _vacancyId: VacancyId;
  private _status: ApplicationStatus;
  private _coverLetter: string;

  constructor(props: {
    id?: ApplicationId;
    userId?: UserId;
    vacancyId: VacancyId;
    status?: ApplicationStatus;
    coverLetter: string;
  }) {
    super(props.id);
    this._userId = props.userId;
    this._vacancyId = props.vacancyId;
    this._status = props.status ?? "pending";
    this._coverLetter = props.coverLetter;
  }

  static createNew(props: {
    vacancyId: VacancyId;
    coverLetter: string;
  }): Application {
    return new Application({
      ...props,
      id: undefined,
      status: "pending",
    });
  }

  get userId(): UserId | undefined {
    return this._userId;
  }

  set userId(userId: UserId) {
    this._userId = userId;
  }

  get vacancyId(): VacancyId {
    return this._vacancyId;
  }

  get status(): ApplicationStatus {
    return this._status;
  }

  set status(status: ApplicationStatus) {
    this._status = status;
  }

  get coverLetter(): string {
    return this._coverLetter;
  }

  set coverLetter(coverLetter: string) {
    this._coverLetter = coverLetter;
  }
}
