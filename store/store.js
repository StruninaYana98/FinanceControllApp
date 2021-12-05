import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import expensesReducer from "./slices/expensesSlice";

export default configureStore({
  reducer: {
    userReducer,
    expensesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
