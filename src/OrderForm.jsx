import { useState, useContext } from "react";
import { CartContext } from "./CartContext.jsx";
import SuccessModal from "./components/SuccessModal.jsx";

function OrderForm({ onClose }) {
  const { items, clearCart, loading: cartLoading } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    street: "",
    postal: "",
    city: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Map postal -> "postal-code" to match backend validation if needed
    const sendCustomer = {
      name: customer.name,
      email: customer.email,
      street: customer.street,
      "postal-code": customer.postal,
      city: customer.city,
    };

    const order = { items, customer: sendCustomer };

    try {
      console.log("Sending order payload:", order);
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order), // backend expects top-level body
      });

      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        // ignore parse errors
      }

      if (res.ok) {
        setSuccessMessage(data.message || "Your order was placed successfully.");
        setShowSuccess(true);
        await clearCart(); // uses CartContext clearCart (returns a promise)
      } else {
        const msg = data?.message || data?.error || `Failed to place order (${res.status})`;
        alert(msg);
      }
    } catch (err) {
      console.error("Order failed:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const disabled = isLoading || cartLoading;

  return (
    <>
      {!showSuccess && (
        <form onSubmit={handleSubmit}>
          <h3>Checkout</h3>
          <div className="control">
            <label>Name</label>
            <input name="name" onChange={handleChange} required disabled={disabled} />
          </div>
          <div className="control">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required disabled={disabled} />
          </div>
          <div className="control">
            <label>Street</label>
            <input name="street" onChange={handleChange} required disabled={disabled} />
          </div>
          <div className="control-row">
            <div className="control">
              <label>Postal Code</label>
              <input name="postal" onChange={handleChange} required disabled={disabled} />
            </div>
            <div className="control">
              <label>City</label>
              <input name="city" onChange={handleChange} required disabled={disabled} />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="text-button" onClick={onClose} disabled={disabled}>
              Cancel
            </button>
            <button type="submit" className="button" disabled={disabled}>
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      )}

      {showSuccess && (
        <SuccessModal
          onClose={() => {
            setShowSuccess(false);
            onClose();
          }}
          message={successMessage}
        />
      )}
    </>
  );
}

export default OrderForm;
