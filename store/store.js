import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export default configureStore({
  reducer: {
    userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
