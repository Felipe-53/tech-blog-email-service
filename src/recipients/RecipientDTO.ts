export interface RecipientDTO {
  id: string;
  email: string;
  subscribedAt: Date;
  confirmedAt: Date | null;
}
