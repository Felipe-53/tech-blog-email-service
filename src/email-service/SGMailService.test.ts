import { SGMailService } from "./SGMailService";
import { expect, test } from "vitest";
import { env } from "../env";
import { randomUUID } from "crypto";

test.skip("should be able to send email", async () => {
  const mail = new SGMailService(env.send_grid_api_key);
  const response = await mail.send({
    templateId: "d-dab1027475ce4df18cd0d27f50cd1869",
    from: "felipeasbarbosa.dev@gmail.com",
    to: "felipeandresb97@gmail.com",
    dynamicTemplateData: {
      id: randomUUID(),
    },
  });

  expect(response.accepted).toBeTruthy();
  expect(response.info).toBeDefined();

  console.log(response.info);
});
