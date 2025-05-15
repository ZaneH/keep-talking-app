"use client";

import { OrbitControls, Stats } from "@react-three/drei";
import { Canvas as Canvas3 } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import Scene from "./scene";
import { ControlsProvider } from "./controls-provider";
import { HighlightProvider } from "./highlight-provider";

export default function Canvas() {
  const controlsRef = useRef<any>(null);

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
        <ControlsProvider controlsRef={controlsRef}>
          <OrbitControls
            maxDistance={1.75}
            minDistance={0.5}
            enablePan={false}
            //
            maxPolarAngle={Math.PI / 2 + 0.1}
            ref={controlsRef}
          />
          {/* <SoftShadows samples={40} /> */}
          <Stats />
          <Scene />
        </ControlsProvider>
      </HighlightProvider>
    </Canvas3>
  );
}
