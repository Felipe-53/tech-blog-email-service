import { expect, test } from "vitest";
import { InMemoryRecipientRepo } from "../../repos/InMemoryRecipientRepo";
import { CreateRecipient } from "./CreateRecipient";

const inMemoryRecipientRepo = new InMemoryRecipientRepo();

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
