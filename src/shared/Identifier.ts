import { randomUUID } from "crypto";

export class Identifier {
  private id: string;

  private constructor(id?: string) {
    if (id) {
      // TODO: validate UUID
      this.id = id;
      return;
    }
    this.id = randomUUID();
  }

  public static create(id?: string) {
    return new Identifier(id);
  }

  getValue() {
    return this.id;
  }
}
