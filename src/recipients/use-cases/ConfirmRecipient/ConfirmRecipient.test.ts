import { expect, test, afterEach } from "vitest";
import { ValidationError } from "../../../shared/errors";
import {
  clearDb,
  InMemoryRecipientRepo,
} from "../../repos/InMemoryRecipientRepo";
import { CreateRecipient } from "../CreateRecipient/CreateRecipient";
import { ConfirmRecipient } from "./ConfirmRecipient";

const inMemoryRecipientRepo = new InMemoryRecipientRepo();

afterEach(() => {
  clearDb();
});

test("Should be able to confirm a recipient", async () => {
  const createRecipient = new CreateRecipient(inMemoryRecipientRepo);
  const createdRecipient = await createRecipient.execute({
    email: "felipe@email.com",
  });

  const confirmRecipient = new ConfirmRecipient(inMemoryRecipientRepo);
  const confirmedRecipient = await confirmRecipient.execute({
    id: createdRecipient.id.getValue(),
  });

  expect(confirmedRecipient.confirmedAt).not.toBeNull();
});

test("Should not be able to confirm a recipient that doesn't exist", async () => {
  const confirmRecipient = new ConfirmRecipient(inMemoryRecipientRepo);

  expect(() =>
    confirmRecipient.execute({
      id: "non-existing",
    })
  ).rejects.toBeInstanceOf(ValidationError);
});

test("Should be able to confirm a recipient twice without errors", async () => {
  const createRecipient = new CreateRecipient(inMemoryRecipientRepo);
  const confirmRecipient = new ConfirmRecipient(inMemoryRecipientRepo);

  const createdRecipient = await createRecipient.execute({
    email: "felipe@email.com",
  });

  const confirmedRecipient = await confirmRecipient.execute({
    id: createdRecipient.id.getValue(),
  });

  expect(confirmedRecipient.confirmedAt).not.toBeNull();

  const confirmedTwice = await confirmRecipient.execute({
    id: confirmedRecipient.id.getValue(),
  });

  expect(confirmedTwice.confirmedAt).not.toBeNull();
});
