"use client";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <Float speed={2}>
        <Sphere args={[1, 64, 64]}>
          <meshStandardMaterial color="#6366f1" />
        </Sphere>
      </Float>
    </Canvas>
  );
}
