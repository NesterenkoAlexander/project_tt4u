export const defaultCategories = [
  // Категории доходов
  {
    id: "salary",
    name: "Зарплата",
    type: "INCOME",
    color: "#22c55e", // Зеленый
    icon: "Wallet",
  },
  {
    id: "freelance",
    name: "Фриланс",
    type: "INCOME",
    color: "#06b6d4", // Циан
    icon: "Laptop",
  },
  {
    id: "investments",
    name: "Инвестиции",
    type: "INCOME",
    color: "#6366f1", // Индиго
    icon: "TrendingUp",
  },
  {
    id: "business",
    name: "Бизнес",
    type: "INCOME",
    color: "#ec4899", // Розовый
    icon: "Building",
  },
  {
    id: "rental",
    name: "Аренда",
    type: "INCOME",
    color: "#f59e0b", // Амбарный
    icon: "Home",
  },
  {
    id: "other-income",
    name: "Другие доходы",
    type: "INCOME",
    color: "#64748b", // Серый-темный
    icon: "Plus",
  },

  // Категории расходов
  {
    id: "housing",
    name: "Жилье",
    type: "EXPENSE",
    color: "#ef4444", // Красный
    icon: "Home",
    subcategories: ["Аренда", "Ипотека", "Налог на недвижимость", "Обслуживание"],
  },
  {
    id: "transportation",
    name: "Транспорт",
    type: "EXPENSE",
    color: "#f97316", // Оранжевый
    icon: "Car",
    subcategories: ["Топливо", "Общественный транспорт", "Техобслуживание", "Парковка"],
  },
  {
    id: "groceries",
    name: "Продукты",
    type: "EXPENSE",
    color: "#84cc16", // Лайм
    icon: "Shopping",
  },
  {
    id: "utilities",
    name: "Коммунальные услуги",
    type: "EXPENSE",
    color: "#06b6d4", // Циан
    icon: "Zap",
    subcategories: ["Электричество", "Вода", "Газ", "Интернет", "Телефон"],
  },
  {
    id: "entertainment",
    name: "Развлечения",
    type: "EXPENSE",
    color: "#8b5cf6", // Фиолетовый
    icon: "Film",
    subcategories: ["Кино", "Игры", "Стриминг"],
  },
  {
    id: "food",
    name: "Еда",
    type: "EXPENSE",
    color: "#f43f5e", // Розовый-яркий
    icon: "UtensilsCrossed",
  },
  {
    id: "shopping",
    name: "Покупки",
    type: "EXPENSE",
    color: "#ec4899", // Розовый
    icon: "ShoppingBag",
    subcategories: ["Одежда", "Электроника", "Товары для дома"],
  },
  {
    id: "healthcare",
    name: "Здоровье",
    type: "EXPENSE",
    color: "#14b8a6", // Терракотовый
    icon: "HeartPulse",
    subcategories: ["Лечение", "Стоматология", "Аптеки", "Страховка"],
  },
  {
    id: "education",
    name: "Образование",
    type: "EXPENSE",
    color: "#6366f1", // Индиго
    icon: "GraduationCap",
    subcategories: ["Платежи за обучение", "Книги", "Курсы"],
  },
  {
    id: "personal",
    name: "Личные расходы",
    type: "EXPENSE",
    color: "#d946ef", // Фуксия
    icon: "Smile",
    subcategories: ["Стрижка", "Спортзал", "Красота"],
  },
  {
    id: "travel",
    name: "Путешествия",
    type: "EXPENSE",
    color: "#0ea5e9", // Голубой
    icon: "Plane",
  },
  {
    id: "insurance",
    name: "Страхование",
    type: "EXPENSE",
    color: "#64748b", // Серый-темный
    icon: "Shield",
    subcategories: ["Жизнь", "Дом", "Транспорт"],
  },
  {
    id: "gifts",
    name: "Подарки и пожертвования",
    type: "EXPENSE",
    color: "#f472b6", // Розовый-мягкий
    icon: "Gift",
  },
  {
    id: "bills",
    name: "Счета и комиссии",
    type: "EXPENSE",
    color: "#fb7185", // Розовый-яркий
    icon: "Receipt",
    subcategories: ["Банковские комиссии", "Штрафы", "Услуги"],
  },
  {
    id: "other-expense",
    name: "Прочие расходы",
    type: "EXPENSE",
    color: "#94a3b8", // Серый
    icon: "MoreHorizontal",
  },
];

export const categoryColors = defaultCategories.reduce((acc, category) => {
  acc[category.id] = category.color;
  return acc;
}, {});
