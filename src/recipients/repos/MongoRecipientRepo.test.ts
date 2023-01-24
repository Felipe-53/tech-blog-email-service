import { afterEach } from "vitest";
import { expect, test } from "vitest";
import { Email } from "../email";
import { Recipient } from "../Recipient";
import { clearDb, MongoRecipientRepo } from "./MongoRecipientRepo";

afterEach(async () => {
  await clearDb();
});

const mongoRepo = new MongoRecipientRepo();

test("Should be able to create and find recipient", async () => {
  const rcp = Recipient.createNew({
    email: Email.create("felipe@email.com"),
  });

  await mongoRepo.save(rcp);

  const foundByIdRcp = await mongoRepo.findById(rcp.id);
  expect(foundByIdRcp).toStrictEqual(rcp);

  const foundByEmailRcp = await mongoRepo.findByEmail(rcp.email);
  expect(foundByEmailRcp).toStrictEqual(rcp);
});

test("Should be able to confirm a recipient", async () => {
  const rcp = Recipient.createNew({
    email: Email.create("felipe@email.com"),
  });

  await mongoRepo.save(rcp);

  rcp.confirmRecipient();

  await mongoRepo.save(rcp);

  const confirmedRcp = await mongoRepo.findById(rcp.id);

  expect(confirmedRcp).not.toBeNull();

  expect(confirmedRcp!.confirmedAt).toBeInstanceOf(Date);

  const allConfirmed = await mongoRepo.getAllConfirmed();

  expect(allConfirmed.length).toBe(1);
  expect(allConfirmed[0]).toStrictEqual(confirmedRcp);
});
