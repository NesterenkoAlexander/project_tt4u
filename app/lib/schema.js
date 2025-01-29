import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Введите название"),
  type: z.enum(["CURRENT", "SAVINGS"]),
  balance: z.string().min(1, "Введите начальный баланс"),
  isDefault: z.boolean().default(false),
});