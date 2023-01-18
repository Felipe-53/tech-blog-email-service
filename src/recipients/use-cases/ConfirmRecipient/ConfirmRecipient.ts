import { InconsistentDataError } from "../../../shared/errors";
import { Identifier } from "../../../shared/Identifier";
import { IRecipientRepo } from "../../repos/IRecipientRepo";

interface ConfirmRecipientDTO {
  id: string;
}

export class ConfirmRecipient {
  constructor(private recipientRepo: IRecipientRepo) {}

  async execute({ id }: ConfirmRecipientDTO) {
    const identifier = Identifier.create(id);
    const recipient = await this.recipientRepo.findById(identifier);
    if (!recipient) {
      throw new InconsistentDataError(`Recipient with id ${id} does not exist`);
    }

    recipient.confirmRecipient();

    await this.recipientRepo.save(recipient);
  }
}
