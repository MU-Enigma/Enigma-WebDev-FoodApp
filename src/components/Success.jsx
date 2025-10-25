import { useContext } from 'react';
import { UserProgressContext } from '../store/UserProgressContext';

export default function Success() {
  const { progress, hideCheckout } = useContext(UserProgressContext);

  if (progress !== 'success') {
    return null;
  }

  function handleClose() {
    hideCheckout();
  }

  return (
    <div className="cart">
      <div className="cart-modal success-modal">
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        
        <div className="modal-actions">
          <button className="button" onClick={handleClose}>
            Okay
          </button>
        </div>
      </div>
      <div className="cart-backdrop" onClick={handleClose}></div>
    </div>
  );
}