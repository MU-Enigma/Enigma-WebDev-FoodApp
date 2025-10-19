import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function Cart() {
  const { items, showCart, toggleCart, toggleCheckout, updateItemQuantity, totalPrice } = useContext(CartContext);

  if (!showCart) {
    return null;
  }

  return (
    <div className="cart">
      <div className="cart-modal">
        <h2>Your Cart</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <p>{item.name} - {item.amount} x ${item.price}</p>
              <p className="cart-item-actions">
                <button onClick={() => updateItemQuantity(item.id, item.amount - 1)}>−</button>
                <span>{item.amount}</span>
                <button onClick={() => updateItemQuantity(item.id, item.amount + 1)}>+</button>
              </p>
            </li>
          ))}
        </ul>
        <p className="cart-total">${totalPrice.toFixed(2)}</p>
        <div className="modal-actions">
          <button className="button-text" onClick={toggleCart}>
            Close
          </button>
          <button className="button" onClick={toggleCheckout}>
            Go to Checkout
          </button>
        </div>
      </div>
      <div className="cart-backdrop" onClick={toggleCart}></div>
    </div>
  );
}