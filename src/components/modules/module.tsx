import { useCursor } from "@react-three/drei";
import { useState } from "react";
import type { ModuleModels } from "../../hooks/use-module-model";

export interface ModuleProps {
  id?: keyof typeof ModuleModels;
}

export default function Module({
  id,
  children,
  onPointerEnter,
  onPointerLeave,
  ...props
}: any) {
  const [isHovered, setIsHovered] = useState(false);
  useCursor(isHovered);

  return (
    <group
      userData={{ id }}
      dispose={null}
      name="module"
      onPointerEnter={(e) => {
        setIsHovered(true);
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e) => {
        setIsHovered(false);
        onPointerLeave?.(e);
      }}
      {...props}
    >
      {children}
    </group>
  );
}
