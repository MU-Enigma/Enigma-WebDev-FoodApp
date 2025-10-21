import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;

    try {
      // Only call showModal/close when the state actually changes
      if (open && !modal.open) {
        modal.showModal();
      } else if (!open && modal.open) {
        modal.close();
      }
    } catch (err) {
      // Defensive: some environments may not support dialog.showModal or
      // calling it at certain times can throw. Log and continue.
      // eslint-disable-next-line no-console
      console.warn('Modal dialog control failed:', err);
    }

    return () => {
      try {
        if (modal && modal.open) modal.close();
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="modal" onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
