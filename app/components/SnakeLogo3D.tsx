"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SnakeLogo3D() {
  const { scene } = useGLTF("/models/snake_logo.glb") as any;

  return (
    <primitive
      object={scene}
      scale={[4, 4, 4]} // Increase this value to make the model larger
      position={[0, 0, 0]} // Adjust this if needed to center the model
    />
  );
}

useGLTF.preload("/models/snake_logo.glb");
