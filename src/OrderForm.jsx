import { useState, useContext } from "react";
import { CartContext } from "./CartContext.jsx";
import SuccessModal from "./components/SuccessModal.jsx";

function OrderForm({ onClose }) {
  const { items, clearCart } = useContext(CartContext);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    street: "",
    postal: "",
    city: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = { items, customer };

    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });

      if (res.ok) {
        setShowSuccess(true);
        clearCart();
      } else {
        console.error("Failed to place order");
      }
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  return (
    <>
      {!showSuccess && (
        <form onSubmit={handleSubmit}>
          <h3>Checkout</h3>
          <div className="control">
            <label>Name</label>
            <input name="name" onChange={handleChange} required />
          </div>
          <div className="control">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="control">
            <label>Street</label>
            <input name="street" onChange={handleChange} required />
          </div>
          <div className="control-row">
            <div className="control">
              <label>Postal Code</label>
              <input name="postal" onChange={handleChange} required />
            </div>
            <div className="control">
              <label>City</label>
              <input name="city" onChange={handleChange} required />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="text-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button">
              Place Order
            </button>
          </div>
        </form>
      )}

      {showSuccess && <SuccessModal onClose={onClose} />}
    </>
  );
}

export default OrderForm;
