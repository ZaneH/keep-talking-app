import { useCursor } from "@react-three/drei";
import { useState } from "react";
import type { ModulePosition } from "../../generated/proto/modules.pb";
import type { ModuleModels } from "../../hooks/use-module-model";
import { positionToCoords } from "../../utils/position-to-coords";

export interface BaseModuleProps {
  moduleId: string;
  name?: keyof typeof ModuleModels;
  position?: ModulePosition;
}

interface ModuleProps {
  id: string;
  children: React.ReactNode;
  onPointerEnter?: (_e: any) => void;
  onPointerLeave?: (_e: any) => void;
  position?: ModulePosition;
  onClick?: (event: any) => void;
}

export default function Module({
  id,
  children,
  onPointerEnter,
  onPointerLeave,
  position: modulePosition,
  onClick,
  ...props
}: ModuleProps) {
  const [isHovered, setIsHovered] = useState(false);
  useCursor(isHovered);

  const { position, rotation } = positionToCoords(modulePosition);

  return (
    <group
      position={position}
      rotation={rotation}
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
      onClick={(e) => {
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </group>
  );
}
