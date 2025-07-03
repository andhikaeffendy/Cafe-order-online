// src/features/orderHistory/orderHistorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Order = {
  id: string;
  date: string;
  total: number;
  items: string[];
  status: string;
};

type OrderHistoryState = {
  history: Order[]; // Pastikan 'history' didefinisikan dalam tipe state
};

const initialState: OrderHistoryState = {
  history: [
    {
      id: "TRX123",
      date: "2025-04-14",
      total: 45000,
      items: ["Kopi Susu", "Roti Bakar"],
      status: "Selesai",
    },
    {
      id: "TRX122",
      date: "2025-04-13",
      total: 32000,
      items: ["Matcha Latte"],
      status: "Sedang dibuat",
    },
  ],
};

const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    addOrderToHistory: (state, action: PayloadAction<Order>) => {
      state.history.unshift(action.payload); // Menambahkan order baru di awal array
    },
    clearOrderHistory: (state) => {
      state.history = []; // Membersihkan riwayat pesanan
    },
  },
});

export const { addOrderToHistory, clearOrderHistory } = orderHistorySlice.actions;

export default orderHistorySlice.reducer;
