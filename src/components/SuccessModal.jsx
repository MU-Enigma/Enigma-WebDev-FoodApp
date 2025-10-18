// src/components/SuccessModal.jsx
function SuccessModal({ onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal success-modal">
        <h2>✅ Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>We will get back to you with more details via email within the next few minutes.</p>
        <button className="button" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
