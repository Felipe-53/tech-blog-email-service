import { InMemoryRecipientRepo } from "../../repos/InMemoryRecipientRepo";
import { ConfirmRecipient } from "./ConfirmRecipient";
import { ConfirmRecipientController } from "./ConfirmRecipientController";

const inMemoryRecipientRepo = new InMemoryRecipientRepo();
const confirmRecipient = new ConfirmRecipient(inMemoryRecipientRepo);
export const confirmRecipientController = new ConfirmRecipientController(
  confirmRecipient
);
