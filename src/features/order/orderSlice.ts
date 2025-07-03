import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type OrderState = {
  table: number | null; // Table number
  order: OrderItem[]; // List of ordered items
};

const initialState: OrderState = {
  table: null,
  order: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Set table number (changed from string to number)
    setTable: (state, action: PayloadAction<number>) => {
      state.table = action.payload;
    },

    // Add an item to the order (or increase quantity if already exists)
    addItem: (
      state,
      action: PayloadAction<{ id: number; name: string; price: number }>
    ) => {
      const existing = state.order.find((item) => item.id === action.payload.id);
      if (existing) {
        // Increase the quantity by 1
        existing.quantity += 1;
      } else {
        // Add a new item with quantity 1
        state.order.push({ ...action.payload, quantity: 1 });
      }
    },

    // Remove an item from the order (decrease quantity or remove it)
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.order.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        if (state.order[index].quantity > 1) {
          // Decrease quantity if greater than 1
          state.order[index].quantity -= 1;
        } else {
          // Remove the item if quantity is 1
          state.order.splice(index, 1);
        }
      }
    },

    // Reset the entire order and table
    resetOrder: (state) => {
      state.table = null;
      state.order = [];
    },
  },
});

export const { setTable, addItem, removeItem, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
