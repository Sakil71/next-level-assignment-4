import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  modalType: "edit" | "borrow" | null;
  selectedBook: string | null;
  currentPage: number;
  limit: number;
  searchTerm: string;
}

const initialState: UIState = {
  modalType: null,
  selectedBook: null,
  currentPage: 1,
  limit: 10,
  searchTerm: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: "edit" | "borrow"; id: string }>
    ) => {
      state.modalType = action.payload.type;
      state.selectedBook = action.payload.id;
    },
    closeModal: (state) => {
      state.modalType = null;
      state.selectedBook = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { openModal, closeModal, setPage, setSearchTerm } =
  uiSlice.actions;

export default uiSlice.reducer;
