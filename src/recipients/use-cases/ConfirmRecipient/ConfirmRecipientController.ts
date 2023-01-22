import { z } from "zod";
import { FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import { BaseController } from "../../../shared/BaseController";
import { ConfirmRecipient } from "./ConfirmRecipient";
import { InconsistentDataError } from "../../../shared/errors";
import { Recipient } from "../../Recipient";
import { zodToJsonSchema } from "zod-to-json-schema";
import { RecipientMap } from "../../RecipientMap";

const confirmRepicientParams = z.object({
  id: z.string().uuid(),
});

type ConfirmRecipientParams = z.infer<typeof confirmRepicientParams>;

export class ConfirmRecipientController extends BaseController {
  constructor(private confirmRecipient: ConfirmRecipient) {
    super();
  }

  async execute(
    req: FastifyRequest<{ Params: ConfirmRecipientParams }>,
    reply: FastifyReply
  ) {
    const { id } = req.params;

    let recipient: Recipient;
    try {
      recipient = await this.confirmRecipient.execute({ id });
    } catch (error) {
      if (error instanceof InconsistentDataError) {
        return this.conflict(reply, error);
      }
      throw error;
    }

    return this.ok(reply, {
      recipient: RecipientMap.toDTO(recipient),
    });
  }

  get schema() {
    return {
      params: zodToJsonSchema(confirmRepicientParams),
    };
  }
}
