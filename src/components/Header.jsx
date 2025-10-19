import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function Header({ onShowCart }) {
  const { getTotalItems } = useContext(CartContext);

  const totalItems = getTotalItems();

  return (
    <header id="main-header">
      <div id="title">
        <img src="logo.jpg" alt="Restaurant logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button className="text-button" onClick={onShowCart}>
          Cart ({totalItems})
        </button>
      </nav>
    </header>
  );
}