import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expensesList: [],
  expensesMonth: null,
};
export const expensesSlice = createSlice({
  name: "expensesSlice",
  initialState,
  reducers: {
    setExpensesList(state, action) {
      state.expensesList = action.payload;
    },
    setExpensesMonth(state, action) {
      state.expensesMonth = action.payload;
    },
  },
});

export const { setExpensesList, setExpensesMonth } = expensesSlice.actions;

export default expensesSlice.reducer;
