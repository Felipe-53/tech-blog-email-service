import { z } from "zod";
import { FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import { BaseController } from "../../../shared/BaseController";
import { CreateRecipient } from "./CreateRecipient";
import { InconsistentDataError } from "../../../shared/errors";
import { Recipient } from "../../Recipient";
import { zodToJsonSchema } from "zod-to-json-schema";

const createRepicientBody = z.object({
  email: z.string().email(),
});

type CreateRecipientBody = z.infer<typeof createRepicientBody>;

export class CreateRecipientController extends BaseController {
  constructor(private useCase: CreateRecipient) {
    super();
  }

  async execute(
    req: FastifyRequest<{ Body: CreateRecipientBody }>,
    reply: FastifyReply
  ) {
    const { email } = req.body;

    let recipient: Recipient;
    try {
      recipient = await this.useCase.execute({ email });
    } catch (error) {
      if (error instanceof InconsistentDataError) {
        return this.conflict(reply, error);
      }
      throw error;
    }

    return this.created(reply, recipient);
  }

  get schema() {
    return {
      body: zodToJsonSchema(createRepicientBody, "createRepicientBody"),
    };
  }
}
