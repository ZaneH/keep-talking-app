"use client";

import { OrbitControls, SoftShadows, Stats } from "@react-three/drei";
import { Canvas as Canvas3 } from "@react-three/fiber";
import Scene from "./scene";
import * as THREE from "three";

export default function Canvas() {
  return (
    <Canvas3
      gl={{
        antialias: true,
        toneMapping: THREE.AgXToneMapping,
      }}
      shadows
    >
      <OrbitControls
        maxDistance={1.75}
        minDistance={0.5}
        enablePan={false}
        //
        maxPolarAngle={Math.PI / 2 + 0.1}
      />
      <SoftShadows />
      <Stats />
      <Scene />
    </Canvas3>
  );
}
