import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.item.id
      );

      if (existingItemIndex !== -1) {
        // Item already exists, increase quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return { ...state, items: updatedItems };
      } else {
        // New item, add with quantity 1
        return {
          ...state,
          items: [...state.items, { ...action.item, quantity: 1 }]
        };
      }
    }

    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.id
      );

      if (existingItemIndex === -1) return state;

      const existingItem = state.items[existingItemIndex];

      if (existingItem.quantity === 1) {
        // Remove item completely
        const updatedItems = state.items.filter(item => item.id !== action.id);
        return { ...state, items: updatedItems };
      } else {
        // Decrease quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity - 1
        };
        return { ...state, items: updatedItems };
      }
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const totalAmount = cart.items.reduce((total, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return total + (price * item.quantity);
  }, 0);

  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
    totalAmount,
    totalItems
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
