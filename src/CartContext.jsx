import { createContext, useReducer, useState, useMemo, useCallback } from "react";

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

  // memoized action helpers so references stay stable across renders
  const addItem = useCallback(async (item) => {
    setLoading(true);
    try {
      dispatch({ type: "ADD_ITEM", item });
      await simulateDelay();
    } finally {
      setLoading(false);
    }
  }, []); // simulateDelay and setLoading are stable

  const removeItem = useCallback(async (id) => {
    setLoading(true);
    try {
      dispatch({ type: "REMOVE_ITEM", id });
      await simulateDelay();
    } finally {
      setLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setLoading(true);
    try {
      dispatch({ type: "CLEAR_CART" });
      await simulateDelay();
    } finally {
      setLoading(false);
    }
  }, []);

  // expensive derived values memoized
  const totalQuantity = useMemo(
    () => items.reduce((sum, it) => sum + (it.quantity || 0), 0),
    [items]
  );

  const totalAmount = useMemo(() => {
    console.log("Recomputing totalAmount");
    return items.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.quantity || 0), 0);
  }, [items]);

  const contextValue = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
      loading,
      totalQuantity,
      totalAmount,
    }),
    [items, addItem, removeItem, clearCart, loading, totalQuantity, totalAmount]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}
