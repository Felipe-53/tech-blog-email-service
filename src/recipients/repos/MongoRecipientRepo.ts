import { PrismaClient } from "@prisma/client";
import { env } from "../../env";
import { Identifier } from "../../shared/Identifier";
import { Email } from "../email";
import { Recipient } from "../Recipient";
import { RecipientMap } from "../RecipientMap";
import { IRecipientRepo } from "./IRecipientRepo";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.database_url,
    },
  },
});

export async function clearDb() {
  await prisma.dBRecipient.deleteMany();
}

export class MongoRecipientRepo implements IRecipientRepo {
  async save(recipient: Recipient) {
    const exists = await prisma.dBRecipient.findUnique({
      where: {
        id: recipient.id.getValue(),
      },
    });

    if (exists) {
      await prisma.dBRecipient.update({
        where: { id: recipient.id.getValue() },
        data: RecipientMap.toPersistence(recipient),
      });
    }

    await prisma.dBRecipient.create({
      data: RecipientMap.toPersistence(recipient),
    });
  }

  async getAllConfirmed() {
    const response = await prisma.dBRecipient.findMany({
      where: {
        NOT: {
          confirmedAt: null,
        },
      },
    });

    return response.map((rcp) => RecipientMap.fromPersistence(rcp));
  }

  async findByEmail(email: Email) {
    const response = await prisma.dBRecipient.findUnique({
      where: {
        email: email.getValue(),
      },
    });

    if (!response) return null;
    return RecipientMap.fromPersistence(response);
  }

  async findById(id: Identifier) {
    const response = await prisma.dBRecipient.findUnique({
      where: {
        email: id.getValue(),
      },
    });

    if (!response) return null;
    return RecipientMap.fromPersistence(response);
  }
}
