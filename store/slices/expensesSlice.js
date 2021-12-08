import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expensesList: [],
  isExpensesFetching: false,
  currentPeriodDate: null
};
export const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState,
  reducers: {
    setIsExpensesFetching(state, action) {
      state.isExpensesFetching = action.payload;
    },
    setExpensesList(state, action) {
      state.expensesList = action.payload;
    },
    setCurrentPeriodDate(state,action) {
      state.currentPeriodDate = action.payload;
    },
  },
});

export const {
  setExpensesList,
  setIsExpensesFetching,
  setCurrentPeriodDate
} = expensesSlice.actions;

export default expensesSlice.reducer;
