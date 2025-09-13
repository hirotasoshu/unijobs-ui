import { Entity } from "../../../domain/entities/base";
import { AuthContextType } from "../../auth/authContext";

export interface DataMapper<T extends Entity<TId>, TId> {
  insert(entity: T, authContext: AuthContextType): Promise<void>;
  update(
    id: TId,
    changes: Partial<T>,
    authContext: AuthContextType,
  ): Promise<void>;
  delete(id: TId, authContext: AuthContextType): Promise<void>;
}
