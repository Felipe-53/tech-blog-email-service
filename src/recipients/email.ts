import { z } from "zod";
import { ValidationError } from "../shared/errors";
import { ValueObject } from "../shared/ValueObject";

const emailSchema = z.string().email();

interface EmailProps {
  email: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(email: string) {
    const result = emailSchema.safeParse(email);
    if (result.success) {
      return new Email({ email: result.data });
    }
    throw new ValidationError(result.error.message);
  }

  getValue() {
    return this.props.email;
  }
}
