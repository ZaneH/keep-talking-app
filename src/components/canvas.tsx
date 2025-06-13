"use client";
import { Canvas as Canvas3 } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { HighlightProvider } from "./highlight-provider";
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
      <HighlightProvider>
        <Scene />
      </HighlightProvider>
      <Perf />
    </Canvas3>
  );
}
