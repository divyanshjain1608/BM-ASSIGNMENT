import { configureStore } from "@reduxjs/toolkit";
import billsReducer from "./features/bills/billsSlice";

const store = configureStore({
  reducer: {
    bills: billsReducer,
  },
});

export default store;
