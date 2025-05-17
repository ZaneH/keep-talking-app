import type { RefObject } from "react";
import { useCallback } from "react";
import * as THREE from "three";
import { useHighlight } from "../components/highlight-provider";
import { useGameStore } from "./use-game-store";

interface UseMeshHighlightProps {
  meshRef: RefObject<THREE.Mesh>;
  disabled?: boolean;
}

export function useMeshHighlight({
  meshRef,
  disabled = false,
}: UseMeshHighlightProps) {
  const { highlight, unhighlight } = useHighlight();
  const { zoomState } = useGameStore();

  const handlePointerEnter = useCallback(() => {
    if (!disabled && zoomState === "module-view") {
      highlight(meshRef);
    }
  }, [disabled, zoomState, meshRef, highlight]);

  const handlePointerLeave = useCallback(() => {
    unhighlight(meshRef);
  }, [meshRef, unhighlight]);

  return {
    pointerHandlers: {
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
    },
  };
}
