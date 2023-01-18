import { Identifier } from "../../shared/Identifier";
import { Email } from "../email";
import { Recipient } from "../Recipient";

export interface IRecipientRepo {
  getAllConfirmed: () => Promise<Recipient[]>;
  save: (recipient: Recipient) => Promise<void>;
  findByEmail: (email: Email) => Promise<Recipient | null>;
  findById: (id: Identifier) => Promise<Recipient | null>;
}
