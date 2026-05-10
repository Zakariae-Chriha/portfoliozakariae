import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function ParticleField({ count = 1600 }) {
  const ref = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 28;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.025) * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#00F5FF"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Icosahedron() {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.22;
    ref.current.rotation.y = state.clock.elapsedTime * 0.31;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.35;
  });

  return (
    <mesh ref={ref} position={[3.5, 0, -1]}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.22} />
    </mesh>
  );
}

function HeroScene() {
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 600 : 1600;

  return (
    <div className="hero-canvas-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.5]}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleField count={particleCount} />
        {!isMobile && <Icosahedron />}
      </Canvas>
    </div>
  );
}

export default HeroScene;
