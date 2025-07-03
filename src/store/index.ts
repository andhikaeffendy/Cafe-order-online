// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "@/features/order/orderSlice";
import orderHistoryReducer from "@/features/order/orderHistorySlice"; // Memperbaiki impor

export const store = configureStore({
  reducer: {
    order: orderReducer,
    orderHistory: orderHistoryReducer, // Pastikan menggunakan orderHistoryReducer
  },
});

// 👉 Export RootState dan AppDispatch untuk digunakan di seluruh app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
