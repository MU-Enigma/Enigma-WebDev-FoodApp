import { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import CartItem from './CartItem';

export default function Cart({ onClose, onOpenCheckout }) {
  const { items, getTotalPrice } = useContext(CartContext);

  const totalPrice = `$${getTotalPrice().toFixed(2)}`;

  return (
    <>
      {/* Backdrop overlay */}
      <div className="cart-backdrop" onClick={onClose}></div>
      
      {/* Side panel cart */}
      <div className="cart-side-panel">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {items.length === 0 && (
            <div className="cart-empty">
              <p>Your cart is empty</p>
              <p className="cart-empty-subtitle">Add some delicious meals!</p>
            </div>
          )}
          
          {items.length > 0 && (
            <ul className="cart-items-list">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-section">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-price">{totalPrice}</span>
            </div>
            <button className="cart-checkout-btn" onClick={onOpenCheckout}>
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}