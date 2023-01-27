import { z } from "zod";
import { FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import { BaseController } from "../../../shared/BaseController";
import { CreateRecipient } from "./CreateRecipient";
import { InconsistentDataError } from "../../../shared/errors";
import { Recipient } from "../../Recipient";
import { zodToJsonSchema } from "zod-to-json-schema";
import { RecipientMap } from "../../RecipientMap";
import { env } from "../../../env";
import { SGMailService } from "../../../email-service/SGMailService";

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

    if (env.node_env === "production") {
      const sgClient = new SGMailService(env.send_grid_api_key);
      const response = await sgClient.send({
        from: "felipeasbarbosa.dev@gmail.com",
        to: recipient.email.getValue(),
        templateId: "d-dab1027475ce4df18cd0d27f50cd1869",
        dynamicTemplateData: {
          id: recipient.id.getValue(),
        },
      });
      if (!response.accepted) {
        reply.log.error("Unable to send email");
        reply.log.error(response.info);
      }
    }

    return this.created(reply, {
      recipient: RecipientMap.toDTO(recipient),
    });
  }

  get schema() {
    return {
      body: zodToJsonSchema(createRepicientBody, "createRepicientBody"),
    };
  }
}
