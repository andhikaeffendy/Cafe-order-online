// src/store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import orderReducer from "@/features/order/orderSlice";
import orderHistoryReducer from "@/features/order/orderHistorySlice"; // Memperbaiki impor
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  order: orderReducer,
  orderHistory: orderHistoryReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["orderHistory"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// 👉 Export RootState dan AppDispatch untuk digunakan di seluruh app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
