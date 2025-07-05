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
  name: "editBookForm",
  initialState,
  reducers: {
    addBook: <K extends keyof IFormState>(
      state: { [x: string]: string | number | boolean | Date | undefined; },
      action: PayloadAction<{ field: K; value: IFormState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    setFullForm: (state, action: PayloadAction<IFormState>) => {
      Object.assign(state, action.payload);
    },
    resetForm: () => initialState,
  },
});

export const { addBook, resetForm, setFullForm } = formSlice.actions;
export default formSlice.reducer;
