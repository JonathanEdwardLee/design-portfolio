"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Effects } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { SnakeLogo3D } from "./SnakeLogo3D";

export function SnakeLogoWrapper() {
  const neonCyanColor = "#0ff";

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1.2} color={neonCyanColor} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          color={neonCyanColor}
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={1.5}
          color={neonCyanColor}
        />
        <Suspense fallback={null}>
          <SnakeLogo3D />
        </Suspense>
        <OrbitControls />
        <EffectComposer>
          <Bloom
            intensity={1.5} // adjust this value to control the strength of the glow
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
