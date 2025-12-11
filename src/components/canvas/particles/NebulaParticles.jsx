import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Simple Perlin-like noise function
const noise = (x, y, z) => {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  z -= Math.floor(z);
  const u = x * x * (3 - 2 * x);
  const v = y * y * (3 - 2 * y);
  const w = z * z * (3 - 2 * z);
  
  const A = X + Y * 57 + Z * 57 * 57;
  const B = A + 1;
  
  return (1 - u) * (1 - v) * (1 - w) + u * (1 - v) * (1 - w) + 
         (1 - u) * v * (1 - w) + u * v * (1 - w) +
         (1 - u) * (1 - v) * w + u * (1 - v) * w +
         (1 - u) * v * w + u * v * w;
};

const NebulaParticles = ({ scale = 1.0, color = '#bf61ff', particleCount = 8000 }) => {
  const ref = useRef();
  const timeRef = useRef(0);
  const originalPositions = useRef(null);

  // Generate nebula cloud using noise
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random base position
      const baseX = (Math.random() - 0.5) * 3;
      const baseY = (Math.random() - 0.5) * 3;
      const baseZ = (Math.random() - 0.5) * 3;
      
      // Apply noise for organic shape
      const n = noise(baseX * 0.5, baseY * 0.5, baseZ * 0.5);
      const offset = (n - 0.5) * 0.5;
      
      pos[i3] = baseX + offset;
      pos[i3 + 1] = baseY + offset;
      pos[i3 + 2] = baseZ + offset;
      
      // Color variation (purple to pink gradient)
      const colorVariation = Math.random();
      const r = colorVariation < 0.5 ? 0.7 : 0.9;
      const g = colorVariation < 0.5 ? 0.4 : 0.6;
      const b = colorVariation < 0.5 ? 1.0 : 0.8;
      
      colors[i3] = r;
      colors[i3 + 1] = g;
      colors[i3 + 2] = b;
    }
    
    originalPositions.current = new Float32Array(pos);
    return { positions: pos, colors };
  }, [particleCount]);

  // Create geometry with colors
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions.positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(positions.colors, 3));
    return geo;
  }, [positions]);

  useFrame((state, delta) => {
    if (!ref.current || !originalPositions.current) return;

    timeRef.current += delta * 0.1;
    
    // Apply scale
    ref.current.scale.setScalar(scale);

    // Slow morphing animation using noise
    const positionsArray = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const baseX = originalPositions.current[i3];
      const baseY = originalPositions.current[i3 + 1];
      const baseZ = originalPositions.current[i3 + 2];
      
      const n = noise(baseX * 0.3 + timeRef.current, baseY * 0.3, baseZ * 0.3);
      const offset = (n - 0.5) * 0.2;
      
      positionsArray[i3] = baseX + offset;
      positionsArray[i3 + 1] = baseY + offset;
      positionsArray[i3 + 2] = baseZ + offset;
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} geometry={geometry} frustumCulled>
      <PointMaterial
        transparent
        vertexColors
        size={0.004}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export default NebulaParticles;
