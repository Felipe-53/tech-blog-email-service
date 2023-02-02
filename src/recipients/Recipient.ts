import { Entity } from "../shared/Entity";
import { InconsistentDataError } from "../shared/errors";
import { Identifier } from "../shared/Identifier";
import { Email } from "./email";

interface RecipientProps {
  email: Email;
  subscribedAt: Date;
  confirmedAt: Date | null;
}

interface CreateNewRecipientEntityDTO {
  email: Email;
}

interface InstantiateRecipientEntityDTO {
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
    return this.props.email;
  }

  get subscribedAt() {
    return this.props.subscribedAt;
  }

  get confirmedAt() {
    return this.props.confirmedAt;
  }

  public static createNew(props: CreateNewRecipientEntityDTO) {
    return new Recipient({
      email: props.email,
      subscribedAt: new Date(),
      confirmedAt: null,
    });
  }

  public static instantiate(
    props: InstantiateRecipientEntityDTO,
    id: Identifier
  ) {
    if (!props.subscribedAt) {
      throw Error(
        `Trying to instanciate a Recipient with id (${id}) but no subscription date`
      );
    }

    if (props.confirmedAt && props.confirmedAt < props.subscribedAt) {
      throw Error(`confirmedAt date cannot be prior to subscribedAt date`);
    }

    return new Recipient(props, id);
  }

  confirmRecipient() {
    this.props.confirmedAt = new Date();
  }
}
