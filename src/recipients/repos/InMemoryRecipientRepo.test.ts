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

test("Should be able to confirm a recipient", async () => {
  const rcp = Recipient.createNew({
    email: Email.create("felipe@email.com"),
  });

  await inMemoryRecipientRepo.save(rcp);

  rcp.confirmRecipient();

  await inMemoryRecipientRepo.save(rcp);

  const confirmedRcp = await inMemoryRecipientRepo.findById(rcp.id);

  expect(confirmedRcp).not.toBeNull();

  expect(confirmedRcp!.confirmedAt).toBeInstanceOf(Date);

  const allConfirmed = await inMemoryRecipientRepo.getAllConfirmed();

  expect(allConfirmed.length).toBe(1);
  expect(allConfirmed[0]).toStrictEqual(confirmedRcp);
});
