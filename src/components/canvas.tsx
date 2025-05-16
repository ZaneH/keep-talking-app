"use client";

import { CameraControls, Stats } from "@react-three/drei";
import { Canvas as Canvas3 } from "@react-three/fiber";
import OGCameraControls from "camera-controls";
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
      controlsRef.current.mouseButtons.middle = OGCameraControls.ACTION.NONE;
      controlsRef.current.mouseButtons.wheel = OGCameraControls.ACTION.NONE;
      controlsRef.current.touches.one = OGCameraControls.ACTION.NONE;
      controlsRef.current.touches.two = OGCameraControls.ACTION.NONE;
      controlsRef.current.touches.three = OGCameraControls.ACTION.NONE;
    } else {
      controlsRef.current.mouseButtons.left = OGCameraControls.ACTION.ROTATE;
      controlsRef.current.mouseButtons.right = OGCameraControls.ACTION.TRUCK;
      controlsRef.current.mouseButtons.middle = OGCameraControls.ACTION.DOLLY;
      controlsRef.current.mouseButtons.wheel = OGCameraControls.ACTION.ZOOM;
      controlsRef.current.touches.one = OGCameraControls.ACTION.TOUCH_ROTATE;
      controlsRef.current.touches.two =
        OGCameraControls.ACTION.TOUCH_DOLLY_TRUCK;
      controlsRef.current.touches.three =
        OGCameraControls.ACTION.TOUCH_DOLLY_TRUCK;
    }
  }, [cameraLocked]);

  return (
    <Canvas3
      frameloop="demand"
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
            minDistance={0.5}
            maxPolarAngle={Math.PI / 2 + 0.1}
            ref={controlsRef}
          />

          <Stats />
          <Scene />
        </ControlsProvider>
      </HighlightProvider>
    </Canvas3>
  );
}
