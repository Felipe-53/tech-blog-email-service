import { z } from "zod";

export const emailRequestSchema = z.object({
  from: z.string().email(),
  to: z.string().email(),
  templateId: z.string(),
  dynamicTemplateData: z.optional(z.object({})),
});

export interface MailRequest {
  from: string;
  to: string;
  templateId: string;
  dynamicTemplateData?: object;
}

interface MailResponse {
  accepted: boolean;
  info: object;
}

export interface IMailService {
  send: (request: MailRequest | MailRequest[]) => Promise<MailResponse>;
}
