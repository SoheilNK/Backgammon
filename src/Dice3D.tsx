import * as THREE from "three";
import { useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  ThreeElements,
  useLoader,
  Color,
} from "@react-three/fiber";
import { TextureLoader } from "three";

function Box2(props: ThreeElements["mesh"]) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // all texture
  const frontTexture = useLoader(TextureLoader, "textures/dice_2.jpg");
  const backTexture = useLoader(TextureLoader, "textures/dice_4.jpg");
  const topTexture = useLoader(TextureLoader, "textures/dice_1.jpg");
  const bottomTexture = useLoader(TextureLoader, "textures/dice_6.jpg");
  const leftTexture = useLoader(TextureLoader, "textures/dice_3.jpg");
  const rightTexture = useLoader(TextureLoader, "textures/dice_5.jpg");

  // let colors = ['red','green','blue','yellow','purple','orange'];
  let colors = ["white", "white", "white", "white", "white", "white"];
  let textures = [
    frontTexture,
    backTexture,
    topTexture,
    bottomTexture,
    leftTexture,
    rightTexture,
  ];
  let materials = [];
  for (let i = 0; i < 6; i++) {
    materials.push(
      new THREE.MeshStandardMaterial({
        map: textures[i],
        color: hovered ? "hotpink" : "#e3dac9",
      })
    );
  }

  useFrame(
    (_state, _delta) =>
      (mesh.current.rotation.x = mesh.current.rotation.y += 0.01)
  );

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(_event) => setActive(!active)}
      onPointerOver={(_event) => setHover(true)}
      onPointerOut={(_event) => setHover(false)}
      material={materials}
    >
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

export default function Dice3D() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 1, 1]} />
      <Box2 position={[-1.2, 0, 0]} />
      <Box2 position={[1.2, 0, 0]} />
    </Canvas>
  );
}
