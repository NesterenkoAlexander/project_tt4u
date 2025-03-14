"use server";

import { db } from "../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Получить текущий бюджет
export async function getCurrentBudget(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Неавторизованный доступ");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const budget = await db.budget.findFirst({
      where: {
        userId: user.id,
      },
    });

    // Получить расходы текущего месяца
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const expenses = await db.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        accountId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      budget: budget ? { ...budget, amount: budget.amount.toNumber() } : null,
      currentExpenses: expenses._sum.amount
        ? expenses._sum.amount.toNumber()
        : 0,
    };
  } catch (error) {
    console.error("Ошибка получения бюджета:", error);
    throw error;
  }
}

// Обновить бюджет
export async function updateBudget(amount) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Неавторизованный доступ");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("Пользователь не найден");

    // Обновить или создать бюджет
    const budget = await db.budget.upsert({
      where: {
        userId: user.id,
      },
      update: {
        amount,
      },
      create: {
        userId: user.id,
        amount,
      },
    });

    revalidatePath("/dashboard");
    return {
      success: true,
      data: { ...budget, amount: budget.amount.toNumber() },
    };
  } catch (error) {
    console.error("Ошибка обновления бюджета:", error);
    return { success: false, error: error.message };
  }
}