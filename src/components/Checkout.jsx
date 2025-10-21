import { useContext, useState } from 'react';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';

export default function Checkout() {
  const { getTotalPrice, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    street: '',
    postalCode: '',
    city: ''
  });

  if (progress !== 'checkout') {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Handle order submission here
    console.log('Order submitted:', formData);
    clearCart();
    hideCheckout();
    // You could add success message here
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="cart">
      <div className="cart-modal checkout">
        <h2>Checkout</h2>
        <p className="modal-total">Total Amount: ${getTotalPrice().toFixed(2)}</p>

        <form onSubmit={handleSubmit}>
          <div className="control">
            <label htmlFor="full-name">Full Name</label>
            <input
              type="text"
              id="full-name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="control">
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="control">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="control-row">
            <div className="control">
              <label htmlFor="postal-code">Postal Code</label>
              <input
                type="text"
                id="postal-code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="control">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="button-text" onClick={hideCheckout}>
              Close
            </button>
            <button type="submit" className="button">
              Submit Order
            </button>
          </div>
        </form>
      </div>
      <div className="cart-backdrop" onClick={hideCheckout}></div>
    </div>
  );
}