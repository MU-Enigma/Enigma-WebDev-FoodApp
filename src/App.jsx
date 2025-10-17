import { useState, useContext } from "react";
import { CartContext } from "./CartContext.jsx";
import Meals from "./components/Meals.jsx";
import CartModal from "./components/CartModal.jsx";
import "./index.css";
import logo from "./assets/logo.jpg";

function App() {
  const { items } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Logo" /> {/* use the imported logo */}
          <h1>FoodApp</h1>
        </div>
        <button className="button" onClick={() => setIsCartOpen(true)}>
          🛒 Cart ({items.length})
        </button>
      </header>

      {/* Meals Section */}
      <main>
        <Meals />
      </main>

      {/* Cart Modal */}
      {isCartOpen && <CartModal onClose={() => setIsCartOpen(false)} />}
    </div>
  );
}

export default App;
