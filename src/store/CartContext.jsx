import { createContext, useState } from 'react';

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  updateItemQuantity: (id, amount) => {},
  totalPrice: 0,
  showCart: false,
  toggleCart: () => {},
  showCheckout: false,
  toggleCheckout: () => {},
  showSuccess: false,
  setShowSuccess: () => {},
  handleSuccessClose: () => {},
});

export function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleAddItem(item) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? {...i, amount: i.amount + 1} : i
        );
      }
      return [...prevItems, item];
    });
  }

  function handleUpdateItemQuantity(id, amount) {
    setCartItems(prevItems => {
      if (amount <= 0) {
        return prevItems.filter(item => item.id !== id);
      }
      return prevItems.map(item =>
        item.id === id ? {...item, amount} : item
      );
    });
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  function toggleCart() {
    setShowCart(prev => !prev);
    if (showCheckout) setShowCheckout(false);
  }

  function toggleCheckout() {
    setShowCheckout(prev => !prev);
    if (showCart) setShowCart(false);
  }

  function handleSuccessClose() {
    setShowSuccess(false);
    setCartItems([]); // Clear the cart
  }

  const cartContext = {
    items: cartItems,
    addItem: handleAddItem,
    updateItemQuantity: handleUpdateItemQuantity,
    totalPrice: totalPrice,
    showCart: showCart,
    toggleCart: toggleCart,
    showCheckout: showCheckout,
    toggleCheckout: toggleCheckout,
    showSuccess: showSuccess,
    setShowSuccess: setShowSuccess,
    handleSuccessClose: handleSuccessClose,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}