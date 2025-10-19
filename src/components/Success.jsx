import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function Success() {
  const { showSuccess, handleSuccessClose } = useContext(CartContext);

  if (!showSuccess) {
    return null;
  }

  return (
    <div className="cart">
      <div className="cart-modal success-modal">
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <div className="modal-actions">
          <button className="button" onClick={handleSuccessClose}>
            Okay
          </button>
        </div>
      </div>
      <div className="cart-backdrop" onClick={handleSuccessClose}></div>
    </div>
  );
}