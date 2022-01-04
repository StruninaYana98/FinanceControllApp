import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalIncome: null,
  totalExpence: null,
  expensesMonthsStatistic: [],
  incomesMonthsStatistic: [],
  expensesCategoriesStatistic: [],
  incomesCategoriesStatistic: [],
  isStatisticsFetching: false,
  currentPeriodDate: null,
};
export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState,
  reducers: {
    setTotalIncome(state, action) {
      state.totalIncome = action.payload;
    },
    setTotalExpence(state, action) {
      state.totalExpence = action.payload;
    },
    setMonthsExpensesStatistic(state, action) {
      state.expensesMonthsStatistic = action.payload;
    },
    setMonthsIncomesStatistic(state, action) {
      state.incomesMonthsStatistic = action.payload;
    },
    setIsStatisticsFetching(state, action) {
      state.isStatisticsFetching = action.payload;
    },
    setExpensesCategoriesStatistics(state, action) {
      state.expensesCategoriesStatistic = action.payload;
    },
    setIncomesCategoriesStatistics(state, action) {
      state.incomesCategoriesStatistic = action.payload;
    },
    setCurrentPeriodDate(state, action) {
      state.currentPeriodDate = action.payload;
    },
  },
});

export const {
  setTotalIncome,
  setTotalExpence,
  setMonthsExpensesStatistic,
  setMonthsIncomesStatistic,
  setIsStatisticsFetching,
  setExpensesCategoriesStatistics,
  setIncomesCategoriesStatistics,
  setCurrentPeriodDate,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
