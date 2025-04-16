import { EmployerId } from "../valueObjects/id";

export class Employer {
  private _id?: EmployerId;
  private _name: string;
  private _avatarUrl: string;
  private _description: string;

  constructor(props: {
    id?: EmployerId;
    name: string;
    avatarUrl: string;
    description: string;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._avatarUrl = props.avatarUrl;
    this._description = props.description;
  }

  static createNew(props: Omit<Employer, "id">): Employer {
    return new Employer({ ...props, id: undefined });
  }

  get id(): EmployerId | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get avatarUrl(): string {
    return this._avatarUrl;
  }

  get description(): string {
    return this._description;
  }

  set name(name: string) {
    this._name = name;
  }

  set avatarUrl(avatarUrl: string) {
    this._avatarUrl = avatarUrl;
  }

  set description(description: string) {
    this._description = description;
  }
}
