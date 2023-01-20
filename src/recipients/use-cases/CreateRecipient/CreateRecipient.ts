import { InconsistentDataError } from "../../../shared/errors";
import { Email } from "../../email";
import { Recipient } from "../../Recipient";
import { IRecipientRepo } from "../../repos/IRecipientRepo";

export class CreateRecipient {
  constructor(private recipientRepo: IRecipientRepo) {}

  async execute({ email }: CreateRecipientDTO) {
    const validatedEmail = Email.create(email);

    const exists = await this.recipientRepo.findByEmail(validatedEmail);

    if (exists) {
      throw new InconsistentDataError(
        `Recipient with email: '${email} already exists`
      );
    }

    const recipient = Recipient.createNew({
      email: validatedEmail,
    });

    await this.recipientRepo.save(recipient);
    return recipient;
  }
}
