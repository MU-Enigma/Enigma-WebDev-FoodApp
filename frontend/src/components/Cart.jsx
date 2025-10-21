import { useCart } from '../store/CartContext';
import CartItem from './CartItem';

export default function Cart({ onClose, onCheckout }) {
  const { items, totalAmount, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <div className="modal-actions">
          <button onClick={onClose} className="text-button">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">
        Total: ${totalAmount.toFixed(2)}
      </p>
      <div className="modal-actions">
        <button onClick={onClose} className="text-button">
          Close
        </button>
        <button onClick={clearCart} className="button">
          Clear Cart
        </button>
        <button onClick={onCheckout} className="button">
          Go to Checkout
        </button>
      </div>
    </div>
  );
}
