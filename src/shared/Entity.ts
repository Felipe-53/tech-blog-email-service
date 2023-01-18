import { Identifier } from "./Identifier";

export class Entity<T> {
  protected readonly _id: Identifier;
  protected props: T;

  constructor(props: T, id?: Identifier) {
    this._id = id ? id : Identifier.create();
    this.props = props;
  }
}
