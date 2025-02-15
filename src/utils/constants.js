export const MONTHLY_BUDGET = 5000;

export const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "FoodNDining", label: "FoodNDining" },
  { value: "utility", label: "Utility" },
  { value: "shopping", label: "Shopping" },
  { value: "Food & Dining", label: "Food & Dining" },
  { value: "education", label: "Education" },
  { value: "Personal Care", label: "Personal Care" },
  { value: "Travel", label: "Travel" },
];

export const INITIAL_BILLS = [
  {
    id: 1,
    description: "Dominoes",
    category: "FoodNDining",
    amount: 430,
    date: "01-02-2020",
  },
  {
    id: 2,
    description: "Car wash",
    category: "utility",
    amount: 500,
    date: "01-06-2020",
  },
  {
    id: 3,
    description: "Amazon",
    category: "shopping",
    amount: 2030,
    date: "01-07-2020",
  },
  {
    id: 4,
    description: "House rent",
    category: "Food & Dining",
    amount: 2900,
    date: "01-03-2020",
  },
  {
    id: 5,
    description: "Tuition",
    category: "education",
    amount: 2200,
    date: "01-12-2020",
  },
  {
    id: 6,
    description: "Laundry",
    category: "Personal Care",
    amount: 320,
    date: "01-14-2020",
  },
  {
    id: 7,
    description: "Vacation",
    category: "Travel",
    amount: 3430,
    date: "01-18-2020",
  },
];
