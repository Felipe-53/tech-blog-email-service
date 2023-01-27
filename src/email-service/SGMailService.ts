import {
  emailRequestSchema,
  IMailService,
  MailRequest,
} from "./IMailServiceInterface";
import SG from "@sendgrid/mail";
import { z } from "zod";

const SGSendEmailRequestSchema = z.union([
  emailRequestSchema,
  z.array(emailRequestSchema),
]);

export class SGMailService implements IMailService {
  constructor(apiKey: string) {
    SG.setApiKey(apiKey);
  }

  async send(request: MailRequest | MailRequest[]) {
    SGSendEmailRequestSchema.parse(request);

    const [response] = await SG.send(request);

    return {
      accepted: response.statusCode === 202,
    };
  }
}
