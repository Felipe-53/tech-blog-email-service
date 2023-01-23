import { InMemoryRecipientRepo } from "../../repos/InMemoryRecipientRepo";
import { FindAllConfirmedRecipients } from "./FindAllConfirmedRecipients";

const inMemoryRepo = new InMemoryRecipientRepo();
export const findAllConfirmedRecipients = new FindAllConfirmedRecipients(
  inMemoryRepo
);
