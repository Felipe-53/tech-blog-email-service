import { Identifier } from "../../shared/Identifier";
import { Email } from "../email";
import { Recipient } from "../Recipient";
import { IRecipientRepo } from "./IRecipientRepo";

export class InMemoryRecipientRepo implements IRecipientRepo {
  private recipients: Recipient[];

  constructor() {
    this.recipients = [];
  }

  async save(recipient: Recipient) {
    const exists = this.recipients.find((rcp) => rcp.id === recipient.id);
    if (exists) {
      this.recipients = this.recipients.filter(
        (rcp) => rcp.id !== recipient.id
      );
      this.recipients.push(recipient);
    }
    this.recipients.push(recipient);
  }

  async getAllConfirmed() {
    return this.recipients.filter((rcp) => rcp.confirmedAt !== null);
  }

  async findByEmail(email: Email) {
    const result = this.recipients.find(
      (rcp) => rcp.email.getValue() === email.getValue()
    );
    if (!result) return null;
    return result;
  }

  async findById(id: Identifier) {
    const result = this.recipients.find(
      (rcp) => rcp.id.getValue() === id.getValue()
    );
    if (!result) return null;
    return result;
  }
}
