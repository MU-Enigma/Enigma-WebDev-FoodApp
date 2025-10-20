import { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';
import CartItem from './CartItem';

export default function Cart() {
  const { items, getTotalPrice } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  const totalPrice = `$${getTotalPrice().toFixed(2)}`;

  // Only show cart if progress is 'cart'
  if (progress !== 'cart') {
    return null;
  }

  function handleCheckout() {
    hideCart();
    showCheckout();
  }

  return (
    <>
      <div className="cart-backdrop" onClick={hideCart}></div>
      
      <div className="cart-side-panel">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={hideCart}>✕</button>
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
            <button className="cart-checkout-btn" onClick={handleCheckout}>
              Go to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}