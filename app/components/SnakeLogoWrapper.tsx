"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SnakeLogo3D } from "./SnakeLogo3D";

export function SnakeLogoWrapper() {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <SnakeLogo3D />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
