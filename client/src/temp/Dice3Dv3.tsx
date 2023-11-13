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

function Box2(
  props: ThreeElements["mesh"] & { roll: number; rotate: boolean }
) {
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

  let textures = [
    frontTexture,
    backTexture,
    topTexture,
    bottomTexture,
    leftTexture,
    rightTexture,
  ];
  let roll = 50;
  // Calculate number of full rotations needed
  let fullRotations = Math.floor(roll / 2);

  // Calculate corresponding rotation for desired face
  let rollRotation = 0;
  switch (roll % 2) {
    case 0: // Even rolls
      rollRotation = Math.PI;
      break;
    case 1: // Odd rolls
      rollRotation = Math.PI / 2;
      break;
  }

  let materials = [];
  for (let i = 0; i < 6; i++) {
    materials.push(
      new THREE.MeshStandardMaterial({
        map: textures[i],
        color: hovered ? "hotpink" : "#e3dac9",
      })
    );
  }

  // Apply rotations to mesh
  useFrame((_state, delta) => {
    if (fullRotations > 0) {
      mesh.current.rotation.x += delta * Math.PI * 2;
      mesh.current.rotation.y += delta * Math.PI * 2;
      fullRotations--;
    } else if (rollRotation > 0) {
      mesh.current.rotation.x += delta * rollRotation;
      rollRotation = 0;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
      onClick={(_event) => setActive(!active)}
      onPointerOver={(_event) => setHover(true)}
      onPointerOut={(_event) => setHover(false)}
      material={materials}
    >
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}
interface Dice3DProps {
  roll1?: number;
  roll2?: number;
  rotate?: boolean;
}

export default function Dice3Dv3({
  roll1 = 1,
  roll2 = 4,
  rotate = false,
}: Dice3DProps) {
  let rot1 = new THREE.Euler(0, 0, 0);
  return (
    <div id="canvas" className=" h-16">
      <Canvas camera={{ fov: 35, position: [0, -3, 0] }}>
        {/* <color attach="background" args={["white"]} /> */}
        <ambientLight intensity={0.7} />
        <pointLight position={[1, -3, 1]} />
        <Box2 position={[-1.2, 0, 0]} roll={roll1} rotate={rotate} />
        <Box2 position={[1.2, 0, 0]} roll={roll2} rotate={rotate} />
      </Canvas>
    </div>
  );
}
