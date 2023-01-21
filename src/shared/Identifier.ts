import { randomUUID } from "crypto";
import { z } from "zod";
import { ValidationError } from "./errors";

const uuidSchema = z.string().uuid();
export class Identifier {
  private constructor(private id: string) {}

  public static create() {
    const uuid = randomUUID();
    return new Identifier(uuid);
  }

  public static instantiate(id: string) {
    const result = uuidSchema.safeParse(id);
    if (result.success) {
      return new Identifier(result.data);
    }
    throw new ValidationError(result.error.message);
  }

  getValue() {
    return this.id;
  }
}
