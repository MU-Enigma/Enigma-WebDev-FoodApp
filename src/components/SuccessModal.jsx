// src/components/SuccessModal.jsx

function SuccessModal({ onClose }) {
  return (
    <div className="success-backdrop" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon">
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2" fill="none"/>
            <path 
              d="M8 12.5L10.5 15L16 9.5" 
              stroke="#16a34a" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h2 className="success-modal-title">Order Placed Successfully! 🎉</h2>
        
        <div className="success-modal-body">
          <p>
            Your order has been submitted successfully and is being processed.
          </p>
          <p>
            We will get back to you with more details via email within the next few minutes.
          </p>
          <p className="order-note">
            Thank you for choosing our service!
          </p>
        </div>
        
        <div className="success-modal-actions">
          <button className="button" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
