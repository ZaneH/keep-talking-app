import { useCallback, useEffect, useState } from "react";
import { useGameStore } from "./use-game-store";

export function useModuleInput(moduleId: string) {
  const { zoomState, selectedModuleId } = useGameStore();
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (selectedModuleId !== moduleId) {
      setIsPressed(false);
    }
  }, [selectedModuleId, moduleId]);

  const onPointerDown = useCallback(() => {
    if (zoomState !== "module-view") return;
    if (selectedModuleId !== moduleId) return;
    setIsPressed(true);
  }, [zoomState, selectedModuleId, moduleId]);

  const clearPressed = useCallback(() => {
    setIsPressed(false);
  }, []);

  return { onPointerDown, isPressed, clearPressed };
}

export function useGuardedInput(moduleId: string) {
  const { onPointerDown, isPressed, clearPressed } = useModuleInput(moduleId);

  const guard = useCallback(<T,>(handler: () => T): T | undefined => {
    if (!isPressed) return undefined;
    clearPressed();
    return handler();
  }, [isPressed, clearPressed]);

  return { onPointerDown, guard };
}
