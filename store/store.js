import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import expensesReducer from "./slices/expensesSlice";
import incomesReducer from "./slices/incomesSlice";
import statisticsReducer from "./slices/statisticsSlice";

export default configureStore({
  reducer: {
    userReducer,
    expensesReducer,
    incomesReducer,
    statisticsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
