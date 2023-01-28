import { MongoRecipientRepo } from "../../repos/MongoRecipientRepo";
import { FindAllConfirmedRecipients } from "./FindAllConfirmedRecipients";

const mongoRecipientRepo = new MongoRecipientRepo();
export const findAllConfirmedRecipients = new FindAllConfirmedRecipients(
  mongoRecipientRepo
);
