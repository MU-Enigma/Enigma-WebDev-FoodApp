import { createContext, useReducer, useState } from "react";

export const CartContext = createContext();

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((item) => item.id === action.item.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...action.item, quantity: 1 }];
      }
    }

    case "REMOVE_ITEM":
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, initialState);
  const [loading, setLoading] = useState(false);

  const simulateDelay = (ms = 220) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const addItem = async (item) => {
    setLoading(true);
    try {
      dispatch({ type: "ADD_ITEM", item });
      // small delay so UI shows loading feedback reliably
      await simulateDelay();
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    setLoading(true);
    try {
      dispatch({ type: "REMOVE_ITEM", id });
      await simulateDelay();
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      dispatch({ type: "CLEAR_CART" });
      await simulateDelay();
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, loading }}
    >
      {children}
    </CartContext.Provider>
  );
}
