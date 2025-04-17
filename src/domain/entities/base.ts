export abstract class Entity<TId> {
  private _id?: TId;

  constructor(id?: TId) {
    this._id = id;
  }

  get id(): TId | undefined {
    return this._id;
  }

  set id(id: TId) {
    this._id = id;
  }

  equals(other: Entity<TId>): boolean {
    if (other === null || other === undefined) return false;
    if (this === other) return true;
    return this._id === other._id;
  }
}
