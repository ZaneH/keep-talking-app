"use client";

import { Environment, PerspectiveCamera } from "@react-three/drei";
import {
  BrightnessContrast,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import type { Bomb as BombType } from "../generated/proto/bomb.pb";
import { useGameStore } from "../hooks/use-game-store";
import { GameService } from "../services/api";
import Bomb from "./bomb";
import { useHighlight } from "./highlight-provider";
import Table from "./table";

export default function Scene() {
  const { selected } = useHighlight();
  const { bombs } = useGameStore();
  const { setSessionId, setBombs, setSelectedBombId } = useGameStore();
  const isSessionFetched = useRef<boolean>(false);

  useEffect(() => {
    if (isSessionFetched.current) return;
    isSessionFetched.current = true;

    GameService.CreateGame({})
      .then((res) => {
        setSessionId(res.sessionId);

        GameService.GetBombs({
          sessionId: res.sessionId,
        }).then((res) => {
          console.log({ bombs: res.bombs });

          setBombs(res.bombs || []);
          setSelectedBombId(res.bombs?.[0]?.id);
        });
      })
      .catch((err) => {
        console.error("Error fetching session:", err);
        isSessionFetched.current = false;
      });
  }, [setSessionId, setBombs, setSelectedBombId, isSessionFetched]);

  return (
    <>
      <group>
        <directionalLight
          position={[1, 0.7, -1.1]}
          scale={[0.5, 0.5, 0.5]}
          intensity={0.3}
          castShadow
          shadow-normalBias={0.05}
        />
        <directionalLight
          position={[1, 1.9, 1.1]}
          scale={[0.5, 0.5, 0.5]}
          intensity={0.75}
          castShadow
          shadow-normalBias={0.05}
        />
        <ambientLight intensity={0.2} />
        <pointLight
          position={[0, 1.5, 0]}
          intensity={0.6}
          scale={[0.5, 0.5, 0.5]}
          castShadow
          shadow-normalBias={0.05}
        />
        <rectAreaLight
          intensity={0.8}
          position={[0, 1.8, 0]}
          height={2}
          width={3}
          rotation={[Math.PI / -3, Math.PI / 8, Math.PI / 8]}
        />
        <rectAreaLight
          intensity={0.7}
          position={[-1, 1.5, 0]}
          height={0.8}
          width={3}
          rotation={[Math.PI / 2.3, Math.PI / -1.2, Math.PI / 2]}
        />
        <rectAreaLight
          intensity={1.2}
          position={[1, 1.9, -1]}
          height={1}
          width={1}
          rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
        />
      </group>
      <group position={[0, -0.8, 0]}>
        {bombs.map((bomb: BombType) => {
          return (
            <Bomb
              key={bomb.id}
              bombId={bomb.id}
              modules={bomb.modules}
              startedAt={bomb.startedAt}
              timerDuration={bomb.timerDuration}
              batteries={bomb.batteries}
              serialNumber={bomb.serialNumber}
              strikeCount={bomb.strikeCount}
              maxStrikes={bomb.maxStrikes}
              ports={bomb.ports}
              indicators={bomb.indicators}
            />
          );
        })}
        <Table />
      </group>

      <Environment files="/dikhololo_night_1k.hdr" />
      <EffectComposer autoClear={false}>
        <BrightnessContrast contrast={0.18} />
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
        position={[0, 0.2, 1.5]}
        rotation={[-Math.PI / 20, 0, 0]}
        fov={60}
        near={0.2}
        far={50}
      />
    </>
  );
}
