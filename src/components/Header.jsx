import { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';

export default function Header() {
  const { getTotalItems } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  const totalItems = getTotalItems();

  return (
    <header id="main-header">
      <div id="title">
        <img src="logo.jpg" alt="Restaurant logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button className="text-button" onClick={showCart}>
          Cart ({totalItems})
        </button>
      </nav>
    </header>
  );
}