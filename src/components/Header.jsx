import { useContext } from 'react';
import CartContext from '../store/CartContext.jsx';

const Header = ({ onShowCart }) => {
  const cart = useContext(CartContext);

  const totalCartItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src="/logo.jpg" alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <button className="text-button" onClick={onShowCart}>
        Cart ({totalCartItems})
      </button>
    </header>
  );
};

export default Header;
