"use client";

import { Environment, PerspectiveCamera } from "@react-three/drei";
import {
  BrightnessContrast,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import type { Bomb as BombType } from "../generated/proto/bomb";
import { useGameStore } from "../hooks/use-game-store";
import Bomb from "./bomb";
import { useHighlight } from "./highlight-provider";
import { useServer } from "./server-context";
import Table from "./table";

export default function Scene() {
  const lightRef = useRef<any>(null);
  // const lightRef2 = useRef<any>(null);
  const lightRef3 = useRef<any>(null);
  const lightRef4 = useRef<any>(null);
  const lightRef5 = useRef<any>(null);
  const { selected } = useHighlight();
  const { bombs } = useGameStore();
  const { createGameSession } = useServer();

  useEffect(() => {
    createGameSession();
  }, []);

  // useHelper(lightRef, DirectionalLightHelper);
  // useHelper(lightRef2, DirectionalLightHelper);
  // useHelper(lightRef3, RectAreaLightHelper, "blue");
  // useHelper(lightRef4, RectAreaLightHelper, "green");
  // useHelper(lightRef5, RectAreaLightHelper, "red");

  return (
    <>
      <group>
        <directionalLight
          position={[1, 0.7, -1.1]}
          scale={[0.5, 0.5, 0.5]}
          intensity={0.3}
          castShadow
          shadow-normalBias={0.05}
          ref={lightRef}
        />
        <directionalLight
          position={[1, 1.9, 1.1]}
          scale={[0.5, 0.5, 0.5]}
          intensity={0.75}
          castShadow
          shadow-normalBias={0.05}
          ref={lightRef5}
        />
        {/* <directionalLight
          position={[-0.9, 1.9, -1.0]}
          intensity={0.8}
          scale={[0.5, 0.5, 0.5]}
          castShadow
          shadow-normalBias={0.05}
          ref={lightRef2}
        /> */}
        <ambientLight intensity={0.2} />
        <pointLight
          position={[0, 1.5, 0]}
          intensity={0.6}
          scale={[0.5, 0.5, 0.5]}
          castShadow
          shadow-normalBias={0.05}
          ref={lightRef3}
        />
        <rectAreaLight
          intensity={0.8}
          position={[0, 1.8, 0]}
          height={2}
          width={3}
          rotation={[Math.PI / -3, Math.PI / 8, Math.PI / 8]}
          ref={lightRef3}
        />
        <rectAreaLight
          intensity={0.7}
          position={[-1, 1.5, 0]}
          height={0.8}
          width={3}
          rotation={[Math.PI / 2.3, Math.PI / -1.2, Math.PI / 2]}
          ref={lightRef5}
        />
        {/* <rectAreaLight
          intensity={4}
          position={[0, 0, 4]}
          height={2}
          width={3}
          rotation={[Math.PI / 1.1, Math.PI / -1.2, 0]}
        /> */}
        <rectAreaLight
          intensity={1.2}
          position={[1, 1.9, -1]}
          height={1}
          width={1}
          rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
          ref={lightRef4}
        />
      </group>
      <group position={[0, -0.8, 0]}>
        {bombs.map((bomb: BombType) => {
          return <Bomb key={bomb.id} bombId={bomb.id} modules={bomb.modules} />;
        })}
        <Table />
      </group>

      <Environment files="/dikhololo_night_1k.hdr" />
      <EffectComposer autoClear={false}>
        {/* <DepthOfField focusDistance={0.01} focalLength={0.1} bokehScale={2} /> */}
        <BrightnessContrast contrast={0.15} />
        <Outline
          selection={selected}
          visibleEdgeColor={"green" as any}
          hiddenEdgeColor={"green" as any}
          edgeStrength={100}
          xRay
          blur
        />
      </EffectComposer>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 1.5]}
        rotation={[-Math.PI / 8, 0, 0]}
        fov={60}
        near={0.2}
        far={50}
      />
    </>
  );
}
