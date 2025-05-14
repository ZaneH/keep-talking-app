"use client";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas as Canvas3 } from "@react-three/fiber";
import * as THREE from "three";
import Scene from "./scene";

export default function Canvas() {
  return (
    <Canvas3
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.AgXToneMapping,
        shadowMap: {
          enabled: true,
          type: THREE.PCFSoftShadowMap,
        } as any,
      }}
    >
      <OrbitControls
        maxDistance={1.75}
        minDistance={0.5}
        enablePan={false}
        //
        maxPolarAngle={Math.PI / 2 + 0.1}
      />
      {/* <SoftShadows samples={40} /> */}
      <Stats />
      <Scene />
    </Canvas3>
  );
}
