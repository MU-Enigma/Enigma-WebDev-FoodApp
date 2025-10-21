import { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';

export default function Navbar() {
  const { getTotalItems } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const totalItems = getTotalItems();

  return (
    <nav id="main-header">
      <div id="title">
        <img src="/logo.jpg" alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <div>
        <button className="text-button" onClick={showCart}>
          Cart ({totalItems})
        </button>
      </div>
    </nav>
  );
}
