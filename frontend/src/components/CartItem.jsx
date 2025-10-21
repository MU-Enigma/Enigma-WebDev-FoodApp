import { useCart } from '../store/CartContext';

export default function CartItem({ item }) {
  const { addItem, removeItem } = useCart();
  const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x ${price.toFixed(2)}
      </p>
      <div className="cart-item-actions">
        <button onClick={() => removeItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => addItem(item)}>+</button>
      </div>
    </li>
  );
}
