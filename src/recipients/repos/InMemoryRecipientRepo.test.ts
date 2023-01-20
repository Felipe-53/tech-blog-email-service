import { expect, test } from "vitest";
import { Email } from "../email";
import { Recipient } from "../Recipient";
import { InMemoryRecipientRepo } from "./InMemoryRecipientRepo";

let inMemoryRecipientRepo = new InMemoryRecipientRepo();

test("should be able to save a recipient and find it by email and by id", async () => {
  const recipient = Recipient.createNew({
    email: Email.create("felipe@email.com"),
  });

  await inMemoryRecipientRepo.save(recipient);

  const retrievedByEmail = await inMemoryRecipientRepo.findByEmail(
    recipient.email
  );
  const retrievedById = await inMemoryRecipientRepo.findById(recipient.id);

  expect(retrievedByEmail).toStrictEqual(recipient);
  expect(retrievedById).toStrictEqual(recipient);
});
