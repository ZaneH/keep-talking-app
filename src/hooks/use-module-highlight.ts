import React, { useEffect } from "react";
import * as THREE from "three";
import { useHighlight } from "../components/highlight-provider";
import { useGameStore } from "./use-game-store";

interface UseModuleHighlightProps {
  id: string;
  meshRef: React.RefObject<THREE.Mesh>;
}

export default function useModuleHighlight({
  id,
  meshRef,
}: UseModuleHighlightProps) {
  const { highlight, unhighlight } = useHighlight();
  const { zoomState, selectedModuleId } = useGameStore();

  useEffect(() => {
    if (zoomState !== "idle") {
      unhighlight(meshRef);
    }
  }, [zoomState]);

  const pointerHandlers = {
    onPointerEnter: () => {
      if (selectedModuleId !== id) {
        highlight(meshRef);
      }
    },
    onPointerLeave: () => {
      unhighlight(meshRef);
    },
  };

  return { meshRef, pointerHandlers };
}
