import { createContext, useContext } from "react";
import type { OrbitControls } from "three/examples/jsm/Addons.js";

const ControlsContext = createContext<React.RefObject<OrbitControls> | null>(
  null
);

interface ControlsProviderProps {
  controlsRef: React.RefObject<OrbitControls>;
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
