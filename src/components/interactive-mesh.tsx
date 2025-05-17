import { forwardRef, useRef } from "react";
import * as THREE from "three";
import { useMeshHighlight } from "../hooks/use-mesh-highlight";

interface InteractiveMeshProps extends React.ComponentProps<"mesh"> {
  disabled?: boolean;
}

export const InteractiveMesh = forwardRef<THREE.Mesh, InteractiveMeshProps>(
  ({ disabled, children, ...props }, ref) => {
    const innerRef = useRef<THREE.Mesh>(null);
    const meshRef = (ref as React.RefObject<THREE.Mesh>) || innerRef;
    const { pointerHandlers } = useMeshHighlight({ meshRef, disabled });

    return (
      <mesh ref={meshRef} {...pointerHandlers} {...props}>
        {children}
      </mesh>
    );
  }
);

InteractiveMesh.displayName = "InteractiveMesh";
