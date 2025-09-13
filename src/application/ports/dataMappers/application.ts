import { DataMapper } from "./base";
import { Application } from "../../../domain/entities/application";
import { ApplicationId } from "../../../domain/valueObjects/id";
export interface ApplicationDataMapper
  extends DataMapper<Application, ApplicationId> {}
