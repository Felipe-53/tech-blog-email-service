import { InMemoryRecipientRepo } from "../../repos/InMemoryRecipientRepo";
import { CreateRecipient } from "./CreateRecipient";
import { CreateRecipientController } from "./CreateRecipientController";

const recipientRepo = new InMemoryRecipientRepo();
const createRecipient = new CreateRecipient(recipientRepo);
const createRecipientController = new CreateRecipientController(
  createRecipient
);

export { createRecipientController };
