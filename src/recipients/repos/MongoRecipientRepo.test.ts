import { afterEach, beforeEach } from "vitest";
import { expect, test } from "vitest";
import { Email } from "../email";
import { Recipient } from "../Recipient";
import { clearDb, MongoRecipientRepo } from "./MongoRecipientRepo";

afterEach(async () => {
  await clearDb();
});

const repo = new MongoRecipientRepo();

test("Should be able to create and find recipient", async () => {
  const rcp = Recipient.createNew({
    email: Email.create("felipe@email.com"),
  });

  await repo.save(rcp);

  const foundByIdRcp = await repo.findById(rcp.id);
  expect(foundByIdRcp).toStrictEqual(rcp);

  const foundByEmailRcp = await repo.findByEmail(rcp.email);
  expect(foundByEmailRcp).toStrictEqual(rcp);
});
