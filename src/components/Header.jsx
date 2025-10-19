import { useContext } from 'react';
import { CartContext } from '../store/CartContext';

export default function Header() {
  const { items, toggleCart } = useContext(CartContext);
  
  const totalQuantity = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <header>
      <div id="main-header">
        <h1>ReactFood</h1>
        <nav>
          <button className="cart-text" onClick={toggleCart}>
            Cart({totalQuantity})
          </button>
        </nav>
      </div>
    </header>
  );
}