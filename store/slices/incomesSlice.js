import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  incomesList: [],
  isIncomesFetching: false,
  currentPeriodDate: null
};
export const incomesSlice = createSlice({
  name: "incomesSlice",
  initialState,
  reducers: {
    setIsIncomesFetching(state, action) {
      state.isIncomesFetching = action.payload;
    },
    setIncomesList(state, action) {
      state.incomesList = action.payload;
    },
    setCurrentPeriodDate(state,action) {
      state.currentPeriodDate = action.payload;
    },
  },
});

export const {
  setIncomesList,
  setIsIncomesFetching,
  setCurrentPeriodDate
} = incomesSlice.actions;

export default incomesSlice.reducer;
