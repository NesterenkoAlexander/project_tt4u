"use server";

import aj from "../lib/arcjet";
import { db } from "../lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
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

export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Не авторизован");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  try {
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    // Сериализуем аккаунты перед отправкой клиенту
    const serializedAccounts = accounts.map(serializeTransaction);

    return serializedAccounts;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Не авторизован");

    // Получаем данные запроса для ArcJet
    const req = await request();

    // Проверяем лимит запросов
    const decision = await aj.protect(req, {
      userId,
      requested: 1, // Указываем количество токенов для потребления
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        const { remaining, reset } = decision.reason;
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining,
            resetInSeconds: reset,
          },
        });

        throw new Error("Слишком много запросов. Пожалуйста, попробуйте позже.");
      }

      throw new Error("Запрос заблокирован");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    // Конвертируем баланс в число перед сохранением
    const balanceFloat = parseFloat(data.balance);
    if (isNaN(balanceFloat)) {
      throw new Error("Некорректная сумма баланса");
    }

    // Проверяем, является ли это первым аккаунтом пользователя
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    // Если это первый аккаунт, устанавливаем его по умолчанию, несмотря на выбор пользователя
    // В противном случае используем предпочтение пользователя
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    // Если текущий аккаунт должен быть основным, снимаем статус с других
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // Создаем новый аккаунт
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault, // Устанавливаем по логике приложения
      },
    });

    // Сериализуем аккаунт перед возвратом
    const serializedAccount = serializeTransaction(account);

    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Не авторизован");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  // Получаем все транзакции пользователя
  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
  });

  return transactions.map(serializeTransaction);
}