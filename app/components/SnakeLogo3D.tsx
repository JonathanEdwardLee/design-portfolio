"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

export function SnakeLogo3D() {
  const { scene } = useGLTF("/models/snake_logo.glb") as GLTFResult;

  return (
    <primitive
      object={scene}
      scale={[4, 4, 4]} // Increase this value to make the model larger
      position={[0, 0, 0]} // Adjust this if needed to center the model
    />
  );
}

useGLTF.preload("/models/snake_logo.glb");
