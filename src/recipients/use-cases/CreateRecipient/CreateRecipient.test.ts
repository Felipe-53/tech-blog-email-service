import { beforeEach, expect, test } from "vitest";
import { InconsistentDataError } from "../../../shared/errors";
import {
  clearDb,
  InMemoryRecipientRepo,
} from "../../repos/InMemoryRecipientRepo";
import { CreateRecipient } from "./CreateRecipient";

const inMemoryRecipientRepo = new InMemoryRecipientRepo();

beforeEach(() => {
  clearDb();
});

test("should be able to create a recipient and find it in the repo", async () => {
  const createRecipient = new CreateRecipient(inMemoryRecipientRepo);

  const createdRecipient = await createRecipient.execute({
    email: "felipe@email.com",
  });

  const foundRecipient = await inMemoryRecipientRepo.findById(
    createdRecipient.id
  );

  expect(foundRecipient).toStrictEqual(createdRecipient);
});

test("should NOT be able to create a recipient that already exists", async () => {
  const createRecipient = new CreateRecipient(inMemoryRecipientRepo);

  const email = "felipe@email.com";

  await createRecipient.execute({
    email,
  });

  expect(() =>
    createRecipient.execute({
      email,
    })
  ).rejects.toBeInstanceOf(InconsistentDataError);
});
