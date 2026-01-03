import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import StarsParticles from './particles/StarsParticles';
import MeteorsParticles from './particles/MeteorsParticles';
import GalaxyParticles from './particles/GalaxyParticles';
import NebulaParticles from './particles/NebulaParticles';
import ConstellationParticles from './particles/ConstellationParticles';

const PARTICLE_TEMPLATES = {
  stars: StarsParticles,
  meteors: MeteorsParticles,
  galaxy: GalaxyParticles,
  nebula: NebulaParticles,
  constellation: ConstellationParticles,
};

const GestureParticleSystem = ({ 
  template = 'stars', 
  scale = 1.0, 
  color = '#f272c8',
  particleCount = 5000 
}) => {
  const ParticleComponent = PARTICLE_TEMPLATES[template] || StarsParticles;

  // Adjust particle count based on template
  const getParticleCount = () => {
    const counts = {
      stars: particleCount,
      meteors: Math.min(300, particleCount / 10),
      galaxy: Math.min(10000, particleCount * 2),
      nebula: Math.min(8000, particleCount * 1.6),
      constellation: Math.min(3000, particleCount * 0.6),
    };
    return counts[template] || particleCount;
  };

  return (
    <div className='w-full h-full fixed inset-0' style={{ zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <ParticleComponent 
            scale={scale} 
            color={color} 
            particleCount={getParticleCount()} 
          />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default GestureParticleSystem;

