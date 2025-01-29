'use server'

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };
    if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
    }

    if (obj.amount) {
        serialized.amount = obj.amount.toNumber();
    }

    return serialized;
};

export async function createAccount(data) {
    try {
      const { userId } = await auth();
      if (!userId) throw new Error('Нет авторизации')

      const user = await db.user.findUnique({
          where: { clerkUserId: userId },
        });
      
      if (!user) {
        throw new Error("Пользователь не найден");
      }

      // Преобразуем баланс к числу перед сохранением
      const balanceFloat = parseFloat(data.balance);
      if (isNaN(balanceFloat)) {
        throw new Error("Некорректная сумма баланса");
      }

      // Проверяем, первый ли это счёт у пользователя
      const existingAccounts = await db.account.findMany({
        where: { userId: user.id },
      });

      // Если это первый счёт, делаем его основным независимо от выбора пользователя
      // Если нет, используем переданное значение isDefault
      const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;
      
      // Если этот счёт должен стать основным, убираем флаг «основной» у остальных счетов
      if (shouldBeDefault) {
        await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
        });
      }

      // Создаём новый счёт
      const account = await db.account.create({
        data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
        },
      });

      // Сериализуем счета перед отправкой на клиент
      const serializedAccount = serializeTransaction(account);

      revalidatePath("/dashboard");
      return { success: true, data: serializedAccount };
    } catch (error) {
      throw new Error(error.message);
    }
}

export async function getUserAccounts() {
    const { userId } = await auth();
    if (!userId) throw new Error("Нет авторизации");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!user) {
      throw new Error("Пользователь не найден");
    }
  
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count:{
            select:{
                transactions:true,
            }
        }
      }
    });
  
    const serializedAccount = accounts.map(serializeTransaction);

    return serializedAccount;
  }