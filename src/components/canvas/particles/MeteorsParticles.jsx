import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const MeteorsParticles = ({ scale = 1.0, color = '#ffffff', particleCount = 300 }) => {
  const ref = useRef();
  const [meteors] = useState(() => {
    // Create meteor objects with position, velocity, and trail
    const meteorArray = [];
    for (let i = 0; i < particleCount; i++) {
      meteorArray.push({
        // Random starting position on sphere surface
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * 4,
        // Velocity direction
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        // Trail length
        trailLength: 5 + Math.random() * 10,
        // Life
        life: Math.random(),
      });
    }
    return meteorArray;
  });

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Apply scale
    ref.current.scale.setScalar(scale);

    const positionsArray = ref.current.geometry.attributes.position.array;

    meteors.forEach((meteor, i) => {
      // Update meteor position
      meteor.x += meteor.vx;
      meteor.y += meteor.vy;
      meteor.z += meteor.vz;

      // Reset if out of bounds
      const distance = Math.sqrt(meteor.x ** 2 + meteor.y ** 2 + meteor.z ** 2);
      if (distance > 3) {
        meteor.x = (Math.random() - 0.5) * 2;
        meteor.y = (Math.random() - 0.5) * 2;
        meteor.z = (Math.random() - 0.5) * 2;
        meteor.vx = (Math.random() - 0.5) * 0.02;
        meteor.vy = (Math.random() - 0.5) * 0.02;
        meteor.vz = (Math.random() - 0.5) * 0.02;
      }

      // Store position
      const idx = i * 3;
      positionsArray[idx] = meteor.x;
      positionsArray[idx + 1] = meteor.y;
      positionsArray[idx + 2] = meteor.z;
    });

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={color}
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export default MeteorsParticles;

