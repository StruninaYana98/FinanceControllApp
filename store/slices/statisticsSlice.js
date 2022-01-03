import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalIncome: null,
  totalExpence: null,
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
  setIsStatisticsFetching,
  setExpensesCategoriesStatistics,
  setIncomesCategoriesStatistics,
  setCurrentPeriodDate,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
