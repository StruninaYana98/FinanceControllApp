import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import expensesReducer from "./slices/expensesSlice";
import incomesReducer from "./slices/incomesSlice";

export default configureStore({
  reducer: {
    userReducer,
    expensesReducer,
    incomesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
