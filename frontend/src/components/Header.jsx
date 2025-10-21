import { useCart } from '../store/CartContext';

export default function Header({ onShowCart }) {
  const { totalItems } = useCart();

  return (
    <header id="main-header">
      <div id="title">
        <img
          src="/logo.jpg"
          alt="Food Order App"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/logo.svg';
          }}
        />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button onClick={onShowCart} className="text-button">
          Cart ({totalItems})
        </button>
      </nav>
    </header>
  );
}
