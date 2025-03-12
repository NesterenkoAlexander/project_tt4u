import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
  } from "lucide-react";

// Stats Data
  export const statsData = [
  {
      value: "44K+",
      label: "Активных Пользователей",
  },
  {
      value: "$828M+",
      label: "Отслеженных Транзакций",
  },
  {
      value: "99.8%",
      label: "Время Бесперебойной Работы",
  },
  {
      value: "4.8/5",
      label: "Оценка Пользователей",
  },
];

// Features Data
export const featuresData = [
  {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Продвинутая Аналитика",
      description:
      "Получайте детальные данные о ваших расходах с помощью аналитики на базе ИИ",
  },
  {
      icon: <Receipt className="h-8 w-8 text-purple-600" />,
      title: "Умный Сканер Чеков",
      description:
      "Автоматически извлекайте данные из чеков с помощью передовых технологий ИИ",
  },
  {
      icon: <PieChart className="h-8 w-8 text-purple-600" />,
      title: "Планирование Бюджета",
      description: "Создавайте и управляйте бюджетами с помощью умных рекомендаций",
  },
  {
      icon: <CreditCard className="h-8 w-8 text-purple-600" />,
      title: "Поддержка Мультисчетов",
      description: "Управляйте несколькими счетами и картами в одном месте",
  },
  {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "Мультивалютность",
      description: "Поддержка различных валют и их конвертация в режиме реального времени",
  },
  {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "Автоматические Рекомендации",
      description: "Получайте автоматические финансовые инсайты и советы",
  },
];

// How It Works Data
export const howItWorksData = [
  {
      icon: <CreditCard className="h-8 w-8 text-purple-600" />,
      title: "1. Создайте Счёт",
      description:
      "Начните всего за несколько минут — простой и безопасный процесс регистрации",
  },
  {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "2. Отслеживайте Расходы",
      description:
      "Автоматически классифицируйте и отслеживайте транзакции в режиме реального времени",
  },
  {
      icon: <PieChart className="h-8 w-8 text-purple-600" />,
      title: "3. Получайте Инсайты",
      description:
      "Используйте подсказки на базе ИИ для оптимизации своих финансов",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
      name: "Padmé Amidala",
      role: "Предприниматель",
      image: "https://randomuser.me/api/portraits/women/88.jpg",
      quote:
      "project_tt4u полностью изменил мой подход к управлению финансами в бизнесе. Инсайты на базе ИИ помогли мне выявить возможности для экономии, о которых я даже не подозревала.",
  },
  {
      name: "Luke Skywalker",
      role: "Фрилансер",
      image: "https://randomuser.me/api/portraits/men/88.jpg",
      quote:
      "Функция сканирования чеков экономит мне часы работы каждый месяц. Теперь я могу сосредоточиться на своих проектах, а не на ручном вводе данных.",
  },
  {
      name: "Ahsoka Tano",
      role: "Финансовый Консультант",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
      "Я рекомендую project_tt4u всем своим клиентам. Поддержка разных валют и детальная аналитика делают этот сервис идеальным для международных инвесторов.",
  },
];