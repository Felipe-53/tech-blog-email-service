import { Entity } from "../shared/Entity";
import { InconsistentDataError } from "../shared/errors";
import { Identifier } from "../shared/Identifier";
import { Email } from "./email";

interface RecipientProps {
  email: Email;
  subscribedAt: Date;
  confirmedAt: Date | null;
}

export class Recipient extends Entity<RecipientProps> {
  private constructor(props: RecipientProps, id?: Identifier) {
    super(props, id);
  }

  get id() {
    return this._id;
  }

  get email() {
    return this.props.email.getValue();
  }

  get subscribedAt() {
    return this.props.subscribedAt;
  }

  get confirmedAt() {
    return this.props.confirmedAt;
  }

  public static create(props: RecipientProps) {
    if (props.confirmedAt && props.confirmedAt < props.subscribedAt) {
      throw Error(`confirmedAt date cannot be prior to subscribedAt date`);
    }
    return new Recipient(props);
  }

  confirmRecipient() {
    if (this.props.confirmedAt) {
      throw new InconsistentDataError("The reicipent is already confirmed");
    }

    this.props.confirmedAt = new Date();
  }
}
