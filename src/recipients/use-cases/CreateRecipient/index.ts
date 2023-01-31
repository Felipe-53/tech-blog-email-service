import { MongoRecipientRepo } from "../../repos/MongoRecipientRepo";
import { CreateRecipient } from "./CreateRecipient";
import { CreateRecipientController } from "./CreateRecipientController";

const recipientRepo = new MongoRecipientRepo();
const createRecipient = new CreateRecipient(recipientRepo);
const createRecipientController = new CreateRecipientController(
  createRecipient
);

export { createRecipientController };
