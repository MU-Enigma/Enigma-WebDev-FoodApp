import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function CartItem({ item }) {
  const { addItem, removeItem } = useContext(CartContext);

  const formattedPrice = `$${parseFloat(item.price).toFixed(2)}`;
  const itemTotal = `$${(parseFloat(item.price) * item.quantity).toFixed(2)}`;

  return (
    <li className="cart-item-side">
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h4>{item.name}</h4>
          <span className="cart-item-total">{itemTotal}</span>
        </div>
        <p className="cart-item-unit-price">
          {formattedPrice} each
        </p>
      </div>
      <div className="cart-item-controls">
        <button className="cart-btn" onClick={() => removeItem(item.id)}>−</button>
        <span className="cart-quantity">{item.quantity}</span>
        <button className="cart-btn" onClick={() => addItem(item)}>+</button>
      </div>
    </li>
  );
}