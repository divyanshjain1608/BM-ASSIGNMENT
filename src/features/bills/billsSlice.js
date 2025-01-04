import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_BILLS } from "../../utils/constants";

const initialState = {
  bills: INITIAL_BILLS,
  selectedCategory: "all",
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
  },
});

export const { addBill, editBill, removeBill, setCategory } =
  billsSlice.actions;
export default billsSlice.reducer;
