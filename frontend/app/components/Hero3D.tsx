"use client";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Suspense } from "react";

function FloatingOrb() {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.8}>
        <Sphere args={[1.15, 96, 96]}>
          <meshStandardMaterial
            color="#22d3ee"
            metalness={0.8}
            roughness={0.15}
            emissive="#22d3ee"
            emissiveIntensity={0.4}
          />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={1.2} floatIntensity={2}>
        <Sphere args={[1.6, 64, 64]} position={[0.2, 0.1, -0.6]}>
          <meshStandardMaterial
            color="#0ea5e9"
            metalness={0.6}
            roughness={0.35}
            transparent
            opacity={0.22}
          />
        </Sphere>
      </Float>

      <Float speed={1.6} rotationIntensity={0.9} floatIntensity={1.6}>
        <Sphere args={[0.38, 48, 48]} position={[1.6, 0.8, 0.6]}>
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={0.5}
            roughness={0.22}
          />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={1.1} floatIntensity={1.4}>
        <Sphere args={[0.32, 48, 48]} position={[-1.4, -0.6, 0.4]}>
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.45}
            roughness={0.25}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="relative h-full w-full">
      <Canvas>
        <Suspense fallback={null}>
          <color attach="background" args={["#020617"]} />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={55} />

          <ambientLight intensity={0.7} />
          <directionalLight
            position={[4, 6, 5]}
            intensity={1.1}
            color="#e0f2fe"
          />
          <directionalLight
            position={[-4, -3, -5]}
            intensity={0.6}
            color="#7dd3fc"
          />

          <Stars
            radius={40}
            depth={60}
            count={2000}
            factor={4}
            saturation={0}
            fade
          />

          <FloatingOrb />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.9}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
