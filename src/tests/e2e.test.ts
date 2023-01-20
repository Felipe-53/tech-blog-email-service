import { FastifyInstance } from "fastify";
import { beforeEach, expect } from "vitest";
import { test } from "vitest";
import { buildServer } from "../api/server";

let server: FastifyInstance;

beforeEach(() => {
  server = buildServer({
    // logger: true,
  });
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
});
