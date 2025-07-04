import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/uiSlice";
import formReducer from "./features/formSlice"; 
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    addBookForm: formReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
