import Meals from './components/Meals.jsx';
import Header from './components/Header.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Success from './components/Success.jsx';
import { CartContextProvider } from './store/CartContext';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Cart />
      <Checkout />
      <Success />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
