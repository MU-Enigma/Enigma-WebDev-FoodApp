import { useContext, useState } from "react";
import { CartContext } from "../CartContext.jsx";
import OrderForm from "../OrderForm.jsx";

const CartModal = ({ onClose }) => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const [checkoutMode, setCheckoutMode] = useState(false);

  const totalAmount = items
    .reduce((sum, i) => sum + i.price * i.quantity, 0)
    .toFixed(2);

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      
      <dialog className="modal" open>
        {!checkoutMode ? (
          <>
            <h2>Your Cart</h2>
            {items.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="cart-item">
                    <p>{item.name}</p>
                    <div className="cart-item-actions">
                      <button onClick={() => removeItem(item.id)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => addItem(item)}>+</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="cart-total">Total: ${totalAmount}</div>

            <div className="modal-actions">
              <button className="text-button" onClick={onClose}>
                Close
              </button>
              {items.length > 0 && (
                <button className="button" onClick={() => setCheckoutMode(true)}>
                  Checkout
                </button>
              )}
            </div>
          </>
        ) : (
          <OrderForm onClose={onClose} />
        )}
      </dialog>
    </>
  );
};

export default CartModal;
