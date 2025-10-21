export default function OrderSuccess({ orderId, onClose }) {
  return (
    <div className="order-success-popup">
      <h1 className="success-title">Success!</h1>

      <div className="success-body">
        <p className="success-line">Your order was submitted successfully.</p>
        <p className="success-line small">We will get back to you with more details via email within the next few minutes.</p>
      </div>

      <div className="success-actions">
        <button className="okay-button" onClick={onClose} aria-label="Okay">Okay</button>
      </div>
    </div>
  );
}
