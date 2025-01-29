import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_BILLS, MONTHLY_BUDGET } from "../../utils/constants";

const initialState = {
  bills: INITIAL_BILLS,
  selectedCategory: "all",
  monthlyBudget: MONTHLY_BUDGET,
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload);
    },
    editBill: (state, action) => {
      const index = state.bills.findIndex(
        (bill) => bill.id === action.payload.id
      );
      console.log(action.payload);
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    removeBill: (state, action) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setHighlightedBills: (state, action) => {
      // payload = array of bill IDs
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
