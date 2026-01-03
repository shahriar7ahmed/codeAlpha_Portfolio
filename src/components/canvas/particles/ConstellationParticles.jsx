import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const ConstellationParticles = ({ scale = 1.0, color = '#ffffff', particleCount = 3000 }) => {
  const ref = useRef();
  const twinkleRef = useRef(new Float32Array(particleCount));

  // Generate constellation pattern (star clusters)
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    
    // Create star clusters (constellation groups)
    const clusterCount = 8;
    const starsPerCluster = Math.floor(particleCount / clusterCount);
    
    for (let cluster = 0; cluster < clusterCount; cluster++) {
      const clusterCenter = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: (Math.random() - 0.5) * 2,
      };
      
      for (let i = 0; i < starsPerCluster; i++) {
        const starIndex = cluster * starsPerCluster + i;
        if (starIndex >= particleCount) break;
        
        const i3 = starIndex * 3;
        const angle = (i / starsPerCluster) * Math.PI * 2;
        const radius = 0.1 + Math.random() * 0.2;
        
        pos[i3] = clusterCenter.x + Math.cos(angle) * radius;
        pos[i3 + 1] = clusterCenter.y + Math.sin(angle) * radius;
        pos[i3 + 2] = clusterCenter.z + (Math.random() - 0.5) * 0.1;
        
        // Initialize twinkle
        twinkleRef.current[starIndex] = Math.random() * Math.PI * 2;
      }
    }
    
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Slow rotation
    ref.current.rotation.y += delta * 0.05;
    
    // Apply scale
    ref.current.scale.setScalar(scale);
    
    // Twinkling/pulsing effect
    const positions = ref.current.geometry.attributes.position;
    if (positions) {
      const sizes = ref.current.geometry.attributes.size;
      if (sizes) {
        for (let i = 0; i < particleCount; i++) {
          twinkleRef.current[i] += delta * (0.5 + Math.random() * 0.5);
          if (twinkleRef.current[i] > Math.PI * 2) {
            twinkleRef.current[i] -= Math.PI * 2;
          }
          // Pulse size (0.8 to 1.2)
          sizes.array[i] = 0.003 * (0.8 + Math.sin(twinkleRef.current[i]) * 0.2);
        }
        sizes.needsUpdate = true;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default ConstellationParticles;

