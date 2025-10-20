import Header from './components/Header';
import Meals from './components/Meals';
import Cart from './components/Cart';

function App() {
  return (
    <>
      <Header />
      <main>
        <Meals />
      </main>
      <Cart />
    </>
  );
}

export default App;