import { Entity } from "../../domain/entities/base";
import { DataMapper } from "../../application/ports/dataMappers/base";
import { AuthContextType } from "../auth/authContext";

export class UnitOfWork {
  private newEntities = new Set<Entity<any>>();
  private dirtyEntities = new Map<Entity<any>, any>();
  private deletedEntities = new Set<Entity<any>>();
  private mappers = new Map<string, DataMapper<any, any>>();

  registerMapper<T extends Entity<TId>, TId>(
    entityType: string | Function,
    mapper: DataMapper<T, TId>,
  ): void {
    const typeName =
      typeof entityType === "function" ? entityType.name : entityType;

    this.mappers.set(typeName, mapper);
  }

  registerNew(entity: Entity<any>): void {
    if (entity.id) throw new Error("New entity must not have an ID");
    this.newEntities.add(entity);
  }

  registerDirty(entity: Entity<any>): void {
    if (!entity.id) throw new Error("Entity must have an ID");
    if (this.newEntities.has(entity)) return;

    if (!this.dirtyEntities.has(entity)) {
      this.dirtyEntities.set(entity, JSON.parse(JSON.stringify(entity)));
    }
  }

  registerDeleted(entity: Entity<any>): void {
    if (!entity.id) throw new Error("Entity must have an ID");
    this.dirtyEntities.delete(entity);
    this.newEntities.delete(entity);
    this.deletedEntities.add(entity);
  }

  private getMapper(entity: Entity<any>): DataMapper<any, any> {
    const entityType = entity.constructor.name;
    const mapper = this.mappers.get(entityType);

    if (!mapper) {
      throw new Error(`No DataMapper registered for ${entityType}`);
    }

    return mapper;
  }

  async commit(authContext: AuthContextType): Promise<void> {
    try {
      for (const entity of this.newEntities) {
        await this.getMapper(entity).insert(entity, authContext);
      }

      for (const [entity, original] of this.dirtyEntities) {
        const changes = this.getChanges(original, entity);
        if (Object.keys(changes).length > 0) {
          await this.getMapper(entity).update(entity.id, changes, authContext);
        }
      }

      for (const entity of this.deletedEntities) {
        await this.getMapper(entity).delete(entity.id, authContext);
      }

      this.clear();
    } catch (error) {
      this.rollback();
      throw error;
    }
  }

  private getChanges(original: any, current: any): Partial<any> {
    const changes: Partial<any> = {};
    for (const key in current) {
      if (JSON.stringify(original[key]) !== JSON.stringify(current[key])) {
        changes[key] = current[key];
      }
    }
    return changes;
  }

  private clear(): void {
    this.newEntities.clear();
    this.dirtyEntities.clear();
    this.deletedEntities.clear();
  }

  private rollback(): void {
    for (const [entity, original] of this.dirtyEntities) {
      Object.assign(entity, original);
    }
    this.clear();
  }
}
