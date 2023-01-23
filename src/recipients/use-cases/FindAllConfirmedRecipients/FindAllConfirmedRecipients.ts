import { IRecipientRepo } from "../../repos/IRecipientRepo";

export class FindAllConfirmedRecipients {
  constructor(private recipientRepo: IRecipientRepo) {}

  async execute() {
    const recipients = await this.recipientRepo.getAllConfirmed();
    return recipients;
  }
}
