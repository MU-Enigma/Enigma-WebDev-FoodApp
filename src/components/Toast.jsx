import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function Toast() {
  const { toast } = useContext(CartContext);

  if (!toast) return null;

  return (
    <div className={`toast ${toast.type}`}>
      {toast.message}
    </div>
  );
}
