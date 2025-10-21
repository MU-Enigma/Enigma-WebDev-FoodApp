import { useState } from 'react';
import { useCart } from '../store/CartContext';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function Checkout({ onClose, onSuccess }) {
  const { items, totalAmount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    'postal-code': '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate form
    if (!formData.name || !formData.email || !formData.street || 
        !formData['postal-code'] || !formData.city) {
      setError('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const orderData = {
        order: {
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          customer: formData
        }
      };

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        // Try to parse JSON error body, but fall back to raw text if not JSON
        let msg = 'Failed to submit order';
        try {
          const errorData = await response.json();
          msg = errorData.message || JSON.stringify(errorData);
        } catch (parseErr) {
          try {
            msg = await response.text();
          } catch (_) {
            /* ignore */
          }
        }
        throw new Error(msg);
      }

      const result = await response.json();
      console.log('Order submitted successfully:', result);

      // Clear cart and show success
      clearCart();
      onSuccess(result.orderId);
    } catch (err) {
        console.error('Error submitting order:', err);
        // Network-level failure (e.g. backend not running / CORS / connection refused)
        if (err instanceof TypeError && err.message && err.message.toLowerCase().includes('failed to fetch')) {
          setError(`Failed to connect to the server. Please ensure the backend is running at ${API_URL || 'http://localhost:8080'} and try again.`);
        } else {
          setError(err.message || 'Failed to submit order. Please try again.');
        }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p className="cart-total">Total Amount: ${totalAmount.toFixed(2)}</p>

      <form onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="control">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="control">
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="control-row">
          <div className="control">
            <label htmlFor="postal-code">Postal Code</label>
            <input
              type="text"
              id="postal-code"
              name="postal-code"
              value={formData['postal-code']}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="control">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        <div className="modal-actions">
          <button 
            type="button" 
            onClick={onClose} 
            className="text-button"
            disabled={isSubmitting}
          >
            Close
          </button>
          <button 
            type="submit" 
            className="button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
