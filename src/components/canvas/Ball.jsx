import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = ({ imgUrl, isHovered }) => {
  const [decal] = useTexture([imgUrl]);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float 
      speed={isHovered ? 3 : 1.75} 
      rotationIntensity={isHovered ? 2 : 1} 
      floatIntensity={isHovered ? 3.5 : 2}
    >
      <ambientLight intensity={isHovered ? 0.35 : 0.25} />
      <directionalLight position={[0, 0, 0.05]} intensity={isHovered ? 0.5 : 0.25} />
      <mesh 
        ref={meshRef}
        castShadow 
        receiveShadow 
        scale={isHovered ? 3.2 : 2.75}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon, isHovered = false }) => {
  return (
    <Canvas
      frameloop={isHovered ? 'always' : 'demand'}
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          autoRotate={isHovered}
          autoRotateSpeed={isHovered ? 3 : 0}
        />
        <Ball imgUrl={icon} isHovered={isHovered} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;

