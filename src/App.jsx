import Navbar from './components/Navbar.jsx';
import Meals from './components/Meals.jsx';
import Particles from './components/particles-bg/Particles.jsx';
import Cart from './components/Cart'; // ADD THIS - My cart component

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Keep their Particles background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10
      }}>
        <Particles
          particleColors={['#ffc404', '#ffab04', '#d9e2f1']}
          particleCount={100}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={200}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Keep their Navbar */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
      </div>

      {/* Keep their Meals structure */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Meals />
      </main>

      {/* ADD MY CART */}
      <Cart />
    </div>
  );
}

export default App;