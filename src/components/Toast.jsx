import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../store/CartContext';

export default function Toast() {
  const { toast } = useContext(CartContext);
  const [isExiting, setIsExiting] = useState(false);
  const [currentToast, setCurrentToast] = useState(null);

  useEffect(() => {
    if (toast) {
      setIsExiting(false);
      setCurrentToast(toast);
      
      // Start exit animation 500ms before the toast disappears
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 2500); // Toast shows for 3000ms total, exit starts at 2500ms

      return () => clearTimeout(exitTimer);
    } else if (currentToast) {
      // Keep showing the toast during exit animation
      const clearTimer = setTimeout(() => {
        setCurrentToast(null);
      }, 300); // Match the exit animation duration

      return () => clearTimeout(clearTimer);
    }
  }, [toast, currentToast]);

  if (!currentToast) return null;

  return (
    <div className={`toast ${currentToast.type} ${isExiting ? 'exiting' : ''}`}>
      {currentToast.message}
    </div>
  );
}
