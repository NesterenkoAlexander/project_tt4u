"use server";

import { db } from "../lib/prisma";
import { subDays } from "date-fns";

const ACCOUNT_ID = "account-id";
const USER_ID = "user-id";

// Категории с их типичными диапазонами сумм
const CATEGORIES = {
  INCOME: [
    { name: "зарплата", range: [5000, 8000] },
    { name: "фриланс", range: [1000, 3000] },
    { name: "инвестиции", range: [500, 2000] },
    { name: "другой-доход", range: [100, 1000] },
  ],
  EXPENSE: [
    { name: "жильё", range: [1000, 2000] },
    { name: "транспорт", range: [100, 500] },
    { name: "продукты", range: [200, 600] },
    { name: "коммунальные-услуги", range: [100, 300] },
    { name: "развлечения", range: [50, 200] },
    { name: "еда", range: [50, 150] },
    { name: "покупки", range: [100, 500] },
    { name: "здравоохранение", range: [100, 1000] },
    { name: "образование", range: [200, 1000] },
    { name: "путешествия", range: [500, 2000] },
  ],
};

// Помощник для генерации случайной суммы в заданном диапазоне
function getRandomAmount(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Помощник для получения случайной категории с суммой
function getRandomCategory(type) {
  const categories = CATEGORIES[type];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const amount = getRandomAmount(category.range[0], category.range[1]);
  return { category: category.name, amount };
}

export async function seedTransactions() {
  try {
    // Генерируем 90 дней транзакций
    const transactions = [];
    let totalBalance = 0;

    for (let i = 90; i >= 0; i--) {
      const date = subDays(new Date(), i);

      // Генерируем 1-3 транзакции в день
      const transactionsPerDay = Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < transactionsPerDay; j++) {
        // 40% шанс дохода, 60% шанс расхода
        const type = Math.random() < 0.4 ? "INCOME" : "EXPENSE";
        const { category, amount } = getRandomCategory(type);

        const transaction = {
          id: crypto.randomUUID(),
          type,
          amount,
          description: `${type === "INCOME" ? "Получено" : "Оплачено"} ${category}`,
          date,
          category,
          status: "COMPLETED",
          userId: USER_ID,
          accountId: ACCOUNT_ID,
          createdAt: date,
          updatedAt: date,
        };

        totalBalance += type === "INCOME" ? amount : -amount;
        transactions.push(transaction);
      }
    }

    // Вставляем транзакции пакетами и обновляем баланс счета
    await db.$transaction(async (tx) => {
      // Удаляем существующие транзакции
      await tx.transaction.deleteMany({
        where: { accountId: ACCOUNT_ID },
      });

      // Вставляем новые транзакции
      await tx.transaction.createMany({
        data: transactions,
      });

      // Обновляем баланс счета
      await tx.account.update({
        where: { id: ACCOUNT_ID },
        data: { balance: totalBalance },
      });
    });

    return {
      success: true,
      message: `Создано ${transactions.length} транзакций`,
    };
  } catch (error) {
    console.error("Ошибка при посеве транзакций:", error);
    return { success: false, error: error.message };
  }
}