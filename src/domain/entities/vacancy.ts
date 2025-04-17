import { VacancyId } from "../valueObjects/id";
import { EmployerId } from "../valueObjects/id";
import { WorkFormat } from "../valueObjects/workformat";
import { EmploymentType } from "../valueObjects/employmentType";
import { Entity } from "./base";

export class Vacancy extends Entity<VacancyId> {
  private _title: string;
  private _salaryFrom?: number;
  private _salaryTo?: number;
  private _description: string;
  private _location: string;
  private _keySkills: string[];
  private _workFormat: WorkFormat;
  private _employmentType: EmploymentType;
  private _employerId: EmployerId;

  constructor(props: {
    id?: VacancyId;
    title: string;
    salaryFrom?: number;
    salaryTo?: number;
    description: string;
    location: string;
    keySkills: string[];
    workFormat: WorkFormat;
    employmentType: EmploymentType;
    employerId: EmployerId;
  }) {
    super(props.id);
    this._title = props.title;
    this._salaryFrom = props.salaryFrom;
    this._salaryTo = props.salaryTo;
    this._description = props.description;
    this._location = props.location;
    this._keySkills = props.keySkills;
    this._workFormat = props.workFormat;
    this._employmentType = props.employmentType;
    this._employerId = props.employerId;
  }

  static createNew(props: Omit<Vacancy, "id">): Vacancy {
    return new Vacancy({ ...props, id: undefined });
  }

  get title(): string {
    return this._title;
  }

  get salaryFrom(): number | undefined {
    return this._salaryFrom;
  }

  get salaryTo(): number | undefined {
    return this._salaryTo;
  }

  get description(): string {
    return this._description;
  }

  get location(): string {
    return this._location;
  }

  get keySkills(): string[] {
    return this._keySkills;
  }

  get workFormat(): WorkFormat {
    return this._workFormat;
  }

  get employmentType(): EmploymentType {
    return this._employmentType;
  }

  get employerId(): EmployerId {
    return this._employerId;
  }

  set title(title: string) {
    if (!title || title.length < 5) {
      throw new Error("Title must be at least 5 characters long");
    }
    this._title = title;
  }

  set description(description: string) {
    this._description = description;
  }

  set location(location: string) {
    this._location = location;
  }

  set keySkills(skills: string[]) {
    this._keySkills = skills;
  }

  set workFormat(format: WorkFormat) {
    this._workFormat = format;
  }

  set employmentType(type: EmploymentType) {
    this._employmentType = type;
  }

  set salaryFrom(salary: number) {
    if (this._salaryTo && salary > this._salaryTo) {
      throw new Error("Salary from can't be bigger than salary to");
    }
    this._salaryFrom = salary;
  }

  set salaryTo(salary: number) {
    if (this._salaryFrom && salary < this._salaryFrom) {
      throw new Error("Salary to can't be less than salaryFrom");
    }
    this._salaryTo = salary;
  }
}
