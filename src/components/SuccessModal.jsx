// src/components/SuccessModal.jsx

import { useEffect, useState } from "react";

function SuccessModal({ onClose, message = "Your order has been submitted successfully.", loadingDuration = 800 }) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoading(false), loadingDuration);
    return () => clearTimeout(t);
  }, [loadingDuration]);

  return (
    <div className="success-backdrop" onClick={onClose}>
      <div
        className="success-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        {showLoading ? (
          <div className="success-loading" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem" }}>
            <svg width="48" height="48" viewBox="0 0 50 50" aria-hidden="true">
              <circle cx="25" cy="25" r="20" stroke="#e6e6e6" strokeWidth="5" fill="none" />
              <path d="M25 5 a20 20 0 0 1 0 40" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none">
                <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>
            <p style={{ margin: 0, fontSize: "1rem", color: "#1f1a09" }}>Finalizing your order...</p>
          </div>
        ) : (
          <>
            <div className="success-icon" aria-hidden="true">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="2" fill="none" />
                <path
                  d="M8 12.5L10.5 15L16 9.5"
                  stroke="#16a34a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 id="success-title" className="success-modal-title">Order Placed Successfully!!</h2>

            <div className="success-modal-body">
              <p>{message}</p>
              <p>
                We will get back to you with more details via email within the next few minutes.
              </p>
              <p className="order-note">
                Thank you for choosing our service!
              </p>
            </div>

            <div className="success-modal-actions">
              <button className="button" onClick={onClose}>
                Continue Ordering
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SuccessModal;
