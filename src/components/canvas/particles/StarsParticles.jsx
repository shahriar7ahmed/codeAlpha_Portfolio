import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const StarsParticles = ({ scale = 1.0, color = '#f272c8', particleCount = 5000 }) => {
  const ref = useRef();
  const twinkleRef = useRef(new Float32Array(particleCount));

  // Generate star positions in a sphere
  const positions = useMemo(() => {
    const pos = random.inSphere(new Float32Array(particleCount * 3), { radius: 1.2 });
    
    // Initialize twinkle values (brightness variation)
    for (let i = 0; i < particleCount; i++) {
      twinkleRef.current[i] = Math.random();
    }
    
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Slow rotation
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 25;

    // Apply scale
    ref.current.scale.setScalar(scale);

    // Twinkling effect - update brightness
    const positions = ref.current.geometry.attributes.position;
    if (positions) {
      const sizes = ref.current.geometry.attributes.size;
      if (sizes) {
        for (let i = 0; i < particleCount; i++) {
          // Update twinkle value
          twinkleRef.current[i] += delta * (0.5 + Math.random() * 0.5);
          if (twinkleRef.current[i] > Math.PI * 2) {
            twinkleRef.current[i] -= Math.PI * 2;
          }
          // Vary size based on twinkle (0.8 to 1.2)
          sizes.array[i] = 0.002 * (0.8 + Math.sin(twinkleRef.current[i]) * 0.2);
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
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default StarsParticles;

