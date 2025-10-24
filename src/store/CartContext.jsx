import { createContext, useReducer, useEffect, useState } from 'react';
import { CART_ACTIONS } from '../constants/cartActions';

// Create Context
export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  getTotalPrice: () => 0,
  getTotalItems: () => 0,
  toast: null,
});

// Reducer function to manage cart state
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const updatedItems = [...state.items];

      if (existingItemIndex > -1) {
        // Item already exists, increase quantity
        const existingItem = state.items[existingItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        // New item, add to cart
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      const existingItem = state.items[existingItemIndex];
      const updatedItems = [...state.items];

      if (existingItem.quantity === 1) {
        // Remove item completely if quantity is 1
        updatedItems.splice(existingItemIndex, 1);
      } else {
        // Decrease quantity
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems[existingItemIndex] = updatedItem;
      }

      return { ...state, items: updatedItems };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, items: [] };
    }

    case CART_ACTIONS.LOAD_CART: {
      return { ...state, items: action.items };
    }

    default:
      return state;
  }
}

// CartContextProvider Component
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
  const [toast, setToast] = useState(null);

  function showToast(message, type) {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatchCartAction({ type: CART_ACTIONS.LOAD_CART, items: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear corrupted cart data from localStorage
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart.items));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart.items]);

  function addItem(item) {
    dispatchCartAction({ type: CART_ACTIONS.ADD_ITEM, item });
    showToast(`${item.name} added to cart!`, 'success');
  }

  function removeItem(id) {
    const item = cart.items.find(item => item.id === id);
    dispatchCartAction({ type: CART_ACTIONS.REMOVE_ITEM, id });
    if (item) {
      showToast(`${item.name} removed from cart!`, 'error');
    }
  }

  function clearCart() {
    dispatchCartAction({ type: CART_ACTIONS.CLEAR_CART });
  }

  function getTotalPrice() {
    return cart.items.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);
  }

  function getTotalItems() {
    return cart.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
    toast,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}