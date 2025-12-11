import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const GalaxyParticles = ({ scale = 1.0, color = '#915EFF', particleCount = 10000 }) => {
  const ref = useRef();
  const positionsRef = useRef(null);

  // Generate spiral galaxy shape using logarithmic spiral
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Logarithmic spiral: r = a * e^(b*θ)
      const a = 0.5;
      const spiralB = 0.2;
      const theta = (i / particleCount) * Math.PI * 4; // Multiple rotations
      const radius = a * Math.exp(spiralB * theta);
      
      // Add some randomness for thickness
      const randomRadius = radius + (Math.random() - 0.5) * 0.3;
      
      // Convert to Cartesian
      const x = Math.cos(theta) * randomRadius;
      const y = (Math.random() - 0.5) * 0.1; // Thin disk
      const z = Math.sin(theta) * randomRadius;
      
      pos[i3] = x;
      pos[i3 + 1] = y;
      pos[i3 + 2] = z;
      
      // Color gradient from center (bright) to edge (dim)
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      const brightness = Math.max(0.3, 1 - distanceFromCenter / 2);
      
      // Parse color hex to RGB
      const r = parseInt(color.slice(1, 3), 16) / 255;
      const g = parseInt(color.slice(3, 5), 16) / 255;
      const blue = parseInt(color.slice(5, 7), 16) / 255;
      
      colors[i3] = r * brightness;
      colors[i3 + 1] = g * brightness;
      colors[i3 + 2] = blue * brightness;
    }
    
    positionsRef.current = pos;
    return { positions: pos, colors };
  }, [particleCount, color]);

  // Create geometry with colors
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions.positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(positions.colors, 3));
    return geo;
  }, [positions]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Rotate galaxy
    ref.current.rotation.y += delta * 0.1;
    
    // Apply scale
    ref.current.scale.setScalar(scale);
  });

  return (
    <Points ref={ref} geometry={geometry} frustumCulled>
      <PointMaterial
        transparent
        vertexColors
        size={0.003}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

export default GalaxyParticles;
