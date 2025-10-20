// src/components/SuccessModal.jsx
function SuccessModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={e => e.stopPropagation()}
      >
        <h2>Order Confirmed! 🎉</h2>

        <div className="success-modal__body">
          <p>Your order was submitted successfully.</p>
          <p>We will get back to you with more details via email within the next few minutes.</p>
        </div>

        <div className="modal-actions">
          <button className="button" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal; 