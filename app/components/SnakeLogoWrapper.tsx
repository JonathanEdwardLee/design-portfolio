"use client";

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { SnakeLogo3D } from "./SnakeLogo3D";

export function SnakeLogoWrapper() {
  const [interactionEnabled, setInteractionEnabled] = useState(false);
  const neonCyanColor = "#0ff";

  return (
    <div className="flex flex-col items-center">
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
          {interactionEnabled && <OrbitControls />}
          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Canvas>
      </div>
      <button
        onClick={() => setInteractionEnabled(!interactionEnabled)}
        className="mt-2 text-s text-neon-cyan transition-all duration-300 hover:text-neon-cyan neon-button-glow"
      >
        Click to {interactionEnabled ? "TURN OFF" : "TURN ON"} interaction with
        the 3D Hoop Snake
      </button>
    </div>
  );
}
