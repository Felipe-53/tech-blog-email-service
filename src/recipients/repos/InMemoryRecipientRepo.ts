import { Identifier } from "../../shared/Identifier";
import { Email } from "../email";
import { Recipient } from "../Recipient";
import { IRecipientRepo } from "./IRecipientRepo";

let recipients: Recipient[] = [];

export function clearDb() {
  recipients = [];
}

export class InMemoryRecipientRepo implements IRecipientRepo {
  async save(recipient: Recipient) {
    const exists = recipients.find((rcp) => rcp.id === recipient.id);
    if (exists) {
      recipients = recipients.filter((rcp) => rcp.id !== recipient.id);
      recipients.push(recipient);
    }
    recipients.push(recipient);
  }

  async getAllConfirmed() {
    return recipients.filter((rcp) => rcp.confirmedAt !== null);
  }

  async findByEmail(email: Email) {
    const result = recipients.find(
      (rcp) => rcp.email.getValue() === email.getValue()
    );
    if (!result) return null;
    return result;
  }

  async findById(id: Identifier) {
    const result = recipients.find(
      (rcp) => rcp.id.getValue() === id.getValue()
    );
    if (!result) return null;
    return result;
  }
}
