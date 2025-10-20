import Navbar from './components/Navbar.jsx';
import Meals from './components/Meals.jsx';
import Particles from './components/Particles.jsx';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
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
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
      </div>
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Meals />
      </main>
    </div>
  );
}

export default App;
