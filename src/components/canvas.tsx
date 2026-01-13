"use client";
import { Canvas as Canvas3 } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { HighlightProvider } from "./highlight-provider";
import Scene from "./scene";
import { useState } from "react";
import { PerformanceMonitor } from "@react-three/drei";

export default function Canvas() {
  const [dpr, setDpr] = useState<number>(2);
  return (
    <Canvas3
      dpr={dpr}
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
      <PerformanceMonitor
        factor={1}
        onChange={({ factor }) => setDpr(Math.floor(0.5 + 1.5 * factor))}
      />
      <HighlightProvider>
        <Scene />
      </HighlightProvider>
      <Perf />
    </Canvas3>
  );
}
