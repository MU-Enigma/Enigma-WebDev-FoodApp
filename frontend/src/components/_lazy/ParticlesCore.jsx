import React from 'react';
// This file should import heavy libs like three/react-three-fiber and implement the visual
// Keep this minimal here — in real app this would be a full 3D/particles implementation.

export default function ParticlesCore() {
  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {/* decorative fallback: simple canvas or SVG animation can go here */}
      <svg width="100%" height="100%" style={{ opacity: 0.08 }}>
        <circle cx="80%" cy="10%" r="160" fill="#ffc404" />
      </svg>
    </div>
  );
}
