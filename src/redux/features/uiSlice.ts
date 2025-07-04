import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isEditModalOpen: boolean;
  selectedBook: string | null;
  isBorrowModalOpen: boolean;
  borrowTarget: string | null;
  currentPage: number;
  limit: number;
  searchTerm: string;
}

const initialState: UIState = {
  isEditModalOpen: false,
  selectedBook: null,
  isBorrowModalOpen: false,
  borrowTarget: null,
  currentPage: 1,
  limit: 10,
  searchTerm: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openEditModal: (state, action: PayloadAction<string>) => {
      state.isEditModalOpen = true;
      state.selectedBook = action.payload;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.selectedBook = null;
    },
    openBorrowModal: (state, action: PayloadAction<string>) => {
      state.isBorrowModalOpen = true;
      state.borrowTarget = action.payload;
    },
    closeBorrowModal: (state) => {
      state.isBorrowModalOpen = false;
      state.borrowTarget = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  openEditModal,
  closeEditModal,
  openBorrowModal,
  closeBorrowModal,
  setPage,
  setSearchTerm,
} = uiSlice.actions;

export default uiSlice.reducer;
