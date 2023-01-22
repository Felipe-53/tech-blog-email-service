import { Recipient } from "./Recipient";
import { RecipientDTO } from "./RecipientDTO";

export class RecipientMap {
  public static toDTO(recipient: Recipient): RecipientDTO {
    return {
      id: recipient.id.getValue(),
      email: recipient.email.getValue(),
      subscribedAt: recipient.subscribedAt,
      confirmedAt: recipient.confirmedAt,
    };
  }
}
