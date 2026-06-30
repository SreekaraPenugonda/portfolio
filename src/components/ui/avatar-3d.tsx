"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function DeveloperAvatar() {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group}>
      {/* Neck */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.6, 16]} />
        <meshStandardMaterial
          color="#f0d5c0"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#f0d5c0"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.72, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#1a1a2e"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.25, 0.35, 0.65]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>
      <mesh position={[0.25, 0.35, 0.65]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#2d2d2d" />
      </mesh>

      {/* Eye shine */}
      <mesh position={[-0.22, 0.38, 0.72]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.28, 0.38, 0.72]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Glasses frame */}
      <mesh position={[-0.25, 0.35, 0.62]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.12, 0.14, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.25, 0.35, 0.62]} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.12, 0.14, 16]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Glasses bridge */}
      <mesh position={[0, 0.35, 0.62]}>
        <boxGeometry args={[0.2, 0.03, 0.02]} />
        <meshStandardMaterial color="#333" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Mouth - subtle smile */}
      <mesh position={[0, 0.15, 0.68]}>
        <torusGeometry args={[0.15, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#c4956a" />
      </mesh>

      {/* Body / Torso */}
      <mesh position={[0, -1.8, 0]}>
        <capsuleGeometry args={[0.6, 1.2, 8, 16]} />
        <meshStandardMaterial
          color="#18181b"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Laptop/desk surface in front */}
      <mesh position={[0, -2.2, 1.2]}>
        <boxGeometry args={[1.8, 0.05, 1]} />
        <meshStandardMaterial
          color="#27272a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Laptop screen */}
      <mesh position={[0, -1.6, 1.5]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.2, 0.03, 0.8]} />
        <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, -1.6, 1.55]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[1.0, 0.65]} />
        <meshBasicMaterial color="#3b82f6" opacity={0.15} transparent />
      </mesh>

      {/* Code lines on screen */}
      {[-0.3, -0.1, 0.1, 0.3].map((y, i) => (
        <mesh
          key={i}
          position={[-0.4, -1.6 + y * 0.6, 1.58]}
          rotation={[-0.2, 0, 0]}
        >
          <planeGeometry args={[0.4 + Math.random() * 0.3, 0.03]} />
          <meshBasicMaterial
            color={["#22c55e", "#3b82f6", "#eab308", "#a855f7"][i]}
            opacity={0.4}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

export function Avatar3D() {
  return (
    <div className="h-[400px] w-[400px] sm:h-[500px] sm:w-[500px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0.5, 4]} fov={40} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.3} />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#3b82f6" />
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
          <DeveloperAvatar />
        </Float>
      </Canvas>
    </div>
  );
}