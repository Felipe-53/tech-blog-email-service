import { expect, test } from "vitest";
import { Email } from "./email";

test("Shoud be able to create a valid email", () => {
  const emailString = "felipe@email.com";
  const email = Email.create(emailString);
  expect(email.getValue()).toBe(emailString);
});

test("Shoud NOT be able to create an invalid email", () => {
  const emailString = "invalidemail@mail";
  expect(() => Email.create(emailString)).toThrow();
});
