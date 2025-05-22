import { useCursor } from "@react-three/drei";
import { useState } from "react";
import type { ModulePosition } from "../../generated/proto/modules.pb";
import type { ModuleModels } from "../../hooks/use-module-model";

export interface BaseModuleProps {
  moduleId: string;
  name?: keyof typeof ModuleModels;
  position?: ModulePosition;
}

interface ModuleProps {
  id: string;
  children: React.ReactNode;
  onPointerEnter?: (e: any) => void;
  onPointerLeave?: (e: any) => void;
  position?: ModulePosition;
}

export default function Module({
  id,
  children,
  onPointerEnter,
  onPointerLeave,
  position,
  ...props
}: ModuleProps) {
  const [isHovered, setIsHovered] = useState(false);
  useCursor(isHovered);

  const xFactor = 0.195;
  const yFactor = 0.198;

  const xOffset = -xFactor;
  const yOffset = 0.827;
  const zOffset = 0.1;

  const { col, row, face } = position || {};
  if (col === undefined || row === undefined || face === undefined) {
    console.warn("Module position is not well defined");
    return null;
  }

  return (
    <group
      position={[
        xOffset + xFactor * col,
        yOffset - yFactor * row,
        face === 0 ? zOffset : -zOffset,
      ]}
      userData={{ moduleId: id }}
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
