import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "../../types";

type IFormState = Partial<IBook>;

const initialState: IFormState = {
  title: "",
  author: "",
  genre: "",
  isbn: "",
  description: "",
  copies: 1,
  available: true,
};

export const formSlice = createSlice({
  name: "addBookForm",
  initialState,
  reducers: {
    addBook: <K extends keyof IFormState>(
      state: IFormState,
      action: PayloadAction<{ field: K; value: IFormState[K] }>
    ) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { addBook, resetForm } = formSlice.actions;
export default formSlice.reducer;
