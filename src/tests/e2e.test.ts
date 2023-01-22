import { FastifyInstance } from "fastify";
import { afterEach, beforeEach, expect } from "vitest";
import { test } from "vitest";
import { buildServer } from "../api/server";
import { Recipient } from "../recipients/Recipient";
import { RecipientDTO } from "../recipients/RecipientDTO";
import { clearDb } from "../recipients/repos/InMemoryRecipientRepo";

let server: FastifyInstance;

beforeEach(() => {
  server = buildServer();
});

afterEach(() => {
  clearDb();
  server.close();
});

test("Should be able to create a recipient", async () => {
  const response = await server.inject({
    path: "/recipient",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    payload: {
      email: "felipe@email.com",
    },
  });

  expect(response.statusCode).toBe(201);

  const { recipient } = response.json<{ recipient: RecipientDTO }>();

  expect(recipient.email).toBe("felipe@email.com");
  expect(new Date(recipient.subscribedAt)).toBeInstanceOf(Date);
  expect(recipient.confirmedAt).toBeNull();
});

test("Should NOT be able to create a recipient with invalid email", async () => {
  const response = await server.inject({
    path: "/recipient",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    payload: {
      email: "invalid.email",
    },
  });

  expect(response.statusCode).toBe(400);
});

test("Should NOT be able to create a recipient the was already created", async () => {
  const email = "felipe@email.com";

  const firstResponse = await server.inject({
    path: "/recipient",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    payload: {
      email,
    },
  });

  expect(firstResponse.statusCode).toBe(201);

  const secondResponse = await server.inject({
    path: "/recipient",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    payload: {
      email,
    },
  });

  expect(secondResponse.statusCode).toBe(409);
});

test("Should be able to confirm a recipient", async () => {
  const email = "felipe@email.com";

  const createResponse = await server.inject({
    path: "/recipient",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    payload: {
      email,
    },
  });

  const { recipient: createdRecipient } = createResponse.json<{
    recipient: RecipientDTO;
  }>();
  expect(createdRecipient.confirmedAt).toBeNull();

  const confirmResponse = await server.inject({
    path: `/recipient/${createdRecipient.id}/status`,
    method: "PATCH",
  });

  expect(confirmResponse.statusCode).toBe(200);

  const { recipient: confirmedRecipient } = confirmResponse.json<{
    recipient: RecipientDTO;
  }>();
  expect(new Date(confirmedRecipient.confirmedAt!)).toBeInstanceOf(Date);
});
