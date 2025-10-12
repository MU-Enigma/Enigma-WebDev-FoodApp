import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';

const Cart = ({ onClose }) => {
  const cart = useContext(CartContext);

  const totalPrice = cart.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

  return (
    <dialog className="modal" open>
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id} className="cart-item">
            <p>
              {item.name} - ${item.price} x {item.quantity}
            </p>
            <p className="cart-item-actions">
              <button onClick={() => cart.removeItem(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => cart.addItem(item)}>+</button>
            </p>
          </li>
        ))}
      </ul>
      <p className="cart-total">
        Total: ${totalPrice.toFixed(2)}
      </p>
      <p className="modal-actions">
        <button className="text-button" onClick={onClose}>
          Close
        </button>
        <button className="button">Go to Checkout</button>
      </p>
    </dialog>
  );
};

export default Cart;
