import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_BILLS, MONTHLY_BUDGET } from "../../utils/constants";

const initialState = {
  bills: INITIAL_BILLS,
  selectedCategory: "all",
  monthlyBudget: MONTHLY_BUDGET,
  isBudgetExceeded: false, // Add this line
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
      // Check if budget is exceeded after adding a bill
      const totalExpenses = state.bills.reduce((acc, bill) => acc + bill.amount, 0);
      state.isBudgetExceeded = totalExpenses > state.monthlyBudget;
    },
    editBill: (state, action) => {
      const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
        // Check if budget is exceeded after editing a bill
        const totalExpenses = state.bills.reduce((acc, bill) => acc + bill.amount, 0);
        state.isBudgetExceeded = totalExpenses > state.monthlyBudget;
      }
    },
    removeBill: (state, action) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
      // Check if budget is exceeded after removing a bill
      const totalExpenses = state.bills.reduce((acc, bill) => acc + bill.amount, 0);
      state.isBudgetExceeded = totalExpenses > state.monthlyBudget;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setHighlightedBills: (state, action) => {
      state.highlightedBills = action.payload;
    },
  },
});

export const {
  addBill,
  editBill,
  removeBill,
  setCategory,
  setHighlightedBills,
} = billsSlice.actions;
export default billsSlice.reducer;