import { expect, test } from "vitest";
import { Identifier } from "../shared/Identifier";
import { Email } from "./email";
import { Recipient } from "./Recipient";

let email = Email.create("felipe@email.com");

test("Should be able to create a recipent", () => {
  const recipient = Recipient.create({
    email,
    subscribedAt: new Date(),
    confirmedAt: null,
  });
  expect(recipient.id).toBeInstanceOf(Identifier);
});

test("Should not be able to create a recipient with confirmed date prior to subscription date", () => {
  expect(() =>
    Recipient.create({
      email,
      subscribedAt: new Date("2023-01-01"),
      confirmedAt: new Date("2022-01-01"),
    })
  ).toThrow(/prior/);
});

test("Should be able to confirm a recipient", async () => {
  const recipient = Recipient.create({
    email,
    subscribedAt: new Date(),
    confirmedAt: null,
  });

  // prevent race condition
  await sleep(100);

  recipient.confirmRecipient();
  expect(recipient.confirmedAt! > recipient.subscribedAt).toBeTruthy();
});

test("Should NOT be able to confirm a recipient that is already confirmed", async () => {
  const recipient = Recipient.create({
    email,
    subscribedAt: new Date(),
    confirmedAt: null,
  });

  // prevent race condition
  await sleep(100);

  recipient.confirmRecipient();

  expect(() => recipient.confirmRecipient()).toThrow();
});

function sleep(ms: number) {
  return new Promise((res, rej) => {
    setTimeout(res, ms);
  });
}
