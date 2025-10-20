import { useState, useContext } from "react";
import { CartContext } from "./CartContext.jsx";
import SuccessModal from "./components/SuccessModal.jsx";

function OrderForm({ onClose }) {
  const { items, clearCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    street: "",
    "postal-code": "",
    city: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const order = { items, customer };
    
    console.log('Sending order:', order); // Debug log

    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      
      if (res.ok) {
        setShowSuccess(true);
        clearCart();

      } else {
        console.error('Order failed:', data.message);
        alert(`Order failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Order failed:", err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return <SuccessModal onClose={onClose} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Checkout</h3>
      <div className="control">
        <label>Name</label>
        <input 
          name="name" 
          value={customer.name}
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="control">
        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          value={customer.email}
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="control">
        <label>Street</label>
        <input 
          name="street" 
          value={customer.street}
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="control-row">
        <div className="control">
          <label>Postal Code</label>
          <input 
            name="postal-code" 
            value={customer["postal-code"]}
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="control">
          <label>City</label>
          <input 
            name="city" 
            value={customer.city}
            onChange={handleChange} 
            required 
          />
        </div>
      </div>
      <div className="modal-actions">
        <button 
          type="button" 
          className="text-button" 
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="button"
          disabled={isLoading}
        >
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
}

export default OrderForm;
