import { createContext, useContext } from "react";
import OGCameraControls from "camera-controls";

const ControlsContext =
  createContext<React.RefObject<OGCameraControls | null> | null>(null);

interface ControlsProviderProps {
  controlsRef: React.RefObject<OGCameraControls | null>;
  children: React.ReactNode;
}

export function ControlsProvider({
  children,
  controlsRef,
}: ControlsProviderProps) {
  return (
    <ControlsContext.Provider value={controlsRef}>
      {children}
    </ControlsContext.Provider>
  );
}

export const useControls = () => {
  const ctx = useContext(ControlsContext);
  if (!ctx) throw new Error("useControls must be inside ControlsProvider");
  return ctx;
};
