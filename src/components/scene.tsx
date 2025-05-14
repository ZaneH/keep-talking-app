"use client";

import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { Environment, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { useEffect } from "react";
import { GameServiceClient } from "../generated/proto/game.client";
import Bomb from "./bomb";
import { materials } from "./materials";

export default function Scene() {
  const { camera, gl } = useThree();
  useEffect(() => {
    // TODO: Might be useless. PerspectiveCamera has a aspect property
    const onResize = () => {
      (camera as any).aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      gl.setSize(window.innerWidth, window.innerHeight);
    };

    onResize();
    (async () => {
      const transport = new GrpcWebFetchTransport({
        baseUrl: "http://localhost:8080",
      });
      const gameService = new GameServiceClient(transport);
      const response = await gameService.createGame({});
      console.log(response.response);
    })();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <group>
        <directionalLight position={[2, 3, 1.5]} intensity={1} castShadow />
        <directionalLight position={[0.2, 0.8, 0.5]} intensity={1} castShadow />
        <rectAreaLight
          intensity={3}
          position={[2, 2.8, 0]}
          height={2}
          width={3}
          rotation={[Math.PI / -3, Math.PI / 8, Math.PI / 8]}
        />
        <rectAreaLight
          intensity={3}
          position={[-1, 3, 0]}
          height={2}
          width={3}
          rotation={[Math.PI / 2.3, Math.PI / -1.2, Math.PI / 2]}
        />
        <rectAreaLight
          intensity={4}
          position={[0, 0, 4]}
          height={2}
          width={3}
          rotation={[Math.PI / 1.1, Math.PI / -1.2, 0]}
        />
      </group>
      <group position={[0, -0.8, 0]}>
        <Bomb />
        <Table />
      </group>

      <Environment preset="night" background blur={0.8} />
      <EffectComposer>
        <DepthOfField focusDistance={0.01} focalLength={0.1} bokehScale={8} />
      </EffectComposer>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 10]}
        rotation={[-Math.PI / 8, 0, 0]}
        fov={60}
        near={0.1}
        far={50}
      />
    </>
  );
}

function Table() {
  const { nodes, scene } = useGLTF("/table-room.glb") as any;
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <group>
      <group dispose={null}>
        <group position={[0, 0.916, -1.674]}>
          <mesh
            geometry={nodes.Bars.geometry}
            material={materials["Darker Orange"]}
            scale={[0.106, 1.058, 0.106]}
          />
          <mesh
            geometry={nodes.Frame.geometry}
            material={materials["Darker Orange"]}
            position={[0, 0.758, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[5.492, 12, 5.492]}
          />
          <mesh
            geometry={nodes.Glass.geometry}
            material={materials["Glass"]}
            position={[0, -0.002, 0]}
            scale={[1.011, 1.011, 0.01]}
          />
        </group>
        <mesh
          geometry={nodes.Roof.geometry}
          material={materials["Orange PBSR"]}
          position={[0, 2.73, 0]}
          rotation={[0, 0, Math.PI]}
          scale={[5.492, 12, 5.492]}
        />
        <mesh
          geometry={nodes.Floor.geometry}
          material={materials["Orange PBSR"]}
          scale={[5.492, 12, 5.492]}
          receiveShadow
        />
        <mesh
          geometry={nodes.WallAccent.geometry}
          material={materials["Darker Orange"]}
          position={[1.674, 0.369, 0]}
        />
        <mesh
          geometry={nodes.WallB.geometry}
          material={materials["Orange PBSR"]}
          position={[0, 1.674, -1.674]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[5.492, 12, 5.492]}
        />
        <mesh
          geometry={nodes.WallF.geometry}
          material={materials["Orange PBSR"]}
          position={[0, 1.674, 1.674]}
          rotation={[Math.PI / 2, 0, Math.PI]}
          scale={[5.492, 12, 5.492]}
        />
        <mesh
          geometry={nodes.WallL.geometry}
          material={materials["Orange PBSR"]}
          position={[-1.674, 1.674, 0]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[5.492, 12, 5.492]}
        />
        <mesh
          geometry={nodes.WallR.geometry}
          material={materials["Orange PBSR"]}
          position={[1.674, 1.674, 0]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={[5.492, 12, 5.492]}
        />
        <mesh
          geometry={nodes.Legs.geometry}
          material={materials["Orange PBSR"]}
          position={[0.655, 0, -0.335]}
          scale={0.184}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Top.geometry}
          material={materials["Orange PBSR"]}
          position={[0, 0.449, 0]}
          scale={0.184}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload("/table-room.glb");
