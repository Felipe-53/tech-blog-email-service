import { InMemoryRecipientRepo } from "../../repos/InMemoryRecipientRepo";
import { MongoRecipientRepo } from "../../repos/MongoRecipientRepo";
import { ConfirmRecipient } from "./ConfirmRecipient";
import { ConfirmRecipientController } from "./ConfirmRecipientController";

const inMemoryRecipientRepo = new MongoRecipientRepo();
const confirmRecipient = new ConfirmRecipient(inMemoryRecipientRepo);
export const confirmRecipientController = new ConfirmRecipientController(
  confirmRecipient
);
