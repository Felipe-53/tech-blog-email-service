import { DBRecipient } from "@prisma/client";
import { Identifier } from "../shared/Identifier";
import { Email } from "./email";
import { Recipient } from "./Recipient";
import { RecipientDTO } from "./RecipientDTO";

export class RecipientMap {
  public static fromPersistence(rcp: DBRecipient) {
    return Recipient.instantiate(
      {
        email: Email.create(rcp.email),
        confirmedAt: rcp.confirmedAt,
        subscribedAt: rcp.subscribedAt,
      },
      Identifier.instantiate(rcp.id)
    );
  }

  public static toPersistence(rcp: Recipient): DBRecipient {
    return {
      id: rcp.id.getValue(),
      email: rcp.email.getValue(),
      confirmedAt: rcp.confirmedAt,
      subscribedAt: rcp.subscribedAt,
    };
  }

  public static toDTO(recipient: Recipient): RecipientDTO {
    return {
      id: recipient.id.getValue(),
      email: recipient.email.getValue(),
      subscribedAt: recipient.subscribedAt,
      confirmedAt: recipient.confirmedAt,
    };
  }
}
