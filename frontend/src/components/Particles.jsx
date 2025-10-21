import React, { useEffect } from 'react';

// Lightweight guard component that dynamically imports a heavy particle/three stack
export default function ParticlesWrapper() {
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { default: Particles } = await import('./_lazy/ParticlesCore.jsx');
        if (!mounted) return;
        // render into a portal container if needed
        const container = document.getElementById('particles-root') || document.body;
        const node = document.createElement('div');
        node.id = 'particles-host';
        container.appendChild(node);
        // Particles is a React component; we mount it imperatively
        // Note: avoid adding react-dom as dependency here to keep bundle smaller
        const { createRoot } = await import('react-dom/client');
        const root = createRoot(node);
        root.render(React.createElement(Particles, {}));
      } catch (err) {
        // Fail silently — particles are decorative
        // eslint-disable-next-line no-console
        console.warn('Failed to load particles:', err);
      }
    })();

    return () => {
      mounted = false;
      const host = document.getElementById('particles-host');
      if (host && host.parentNode) host.parentNode.removeChild(host);
    };
  }, []);

  return null; // nothing rendered until dynamically mounted
}
