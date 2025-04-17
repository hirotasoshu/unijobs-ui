import { Entity } from "../../../domain/entities/base";

export interface DataMapper<T extends Entity<TId>, TId> {
  insert(entity: T): Promise<void>;
  update(id: TId, changes: Partial<T>): Promise<void>;
  delete(id: TId): Promise<void>;
}
