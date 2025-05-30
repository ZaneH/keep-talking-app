"use client";

import { CameraControls } from "@react-three/drei";
import { Canvas as Canvas3 } from "@react-three/fiber";
import OGCameraControls from "camera-controls";
import { Perf } from "r3f-perf";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../hooks/use-game-store";
import { ControlsProvider } from "./controls-provider";
import { HighlightProvider } from "./highlight-provider";
import Scene from "./scene";

export default function Canvas() {
  const controlsRef = useRef<OGCameraControls>(null);
  const cameraLocked = useGameStore((state) => state.cameraLocked);

  useEffect(() => {
    if (!controlsRef.current) return;
    if (cameraLocked) {
      controlsRef.current.mouseButtons.left = OGCameraControls.ACTION.NONE;
      controlsRef.current.mouseButtons.right = OGCameraControls.ACTION.NONE;
      controlsRef.current.mouseButtons.wheel = OGCameraControls.ACTION.NONE;
      controlsRef.current.touches.two = OGCameraControls.ACTION.NONE;
    } else {
      controlsRef.current.mouseButtons.left = OGCameraControls.ACTION.ROTATE;
      controlsRef.current.mouseButtons.right = OGCameraControls.ACTION.NONE;
      controlsRef.current.mouseButtons.wheel = OGCameraControls.ACTION.ZOOM;
      controlsRef.current.touches.one = OGCameraControls.ACTION.TOUCH_ROTATE;
      controlsRef.current.touches.two = OGCameraControls.ACTION.TOUCH_ZOOM;
    }
  }, [cameraLocked]);

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
          <CameraControls
            maxDistance={1.75}
            minDistance={0.75}
            maxPolarAngle={Math.PI / 2 + 0.1}
            maxZoom={1.5}
            minZoom={0.8}
            ref={controlsRef}
            truckSpeed={0}
          />

          <Perf />
          <Scene />
        </ControlsProvider>
      </HighlightProvider>
    </Canvas3>
  );
}
