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
  // const [hovered, setHover] = useState(false);
  // const [active, setActive] = useState(false);
  const [rolling, setRolling] = useState(props.rotate);

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
  let materials = [];
  for (let i = 0; i < 6; i++) {
    materials.push(
      new THREE.MeshStandardMaterial({
        map: textures[i],
        color: "#e3dac9",
      })
    );
  }

  //set rotation for each dice number
  let roll = props.roll;
  let rollRotation: [number, number, number] = [0, 0, 0];
  switch (roll) {
    case 1:
      rollRotation = [(Math.PI * 2) / 2, 0, 0]; //--
      break;
    case 2:
      rollRotation = [0, 0, (Math.PI * 3) / 2]; //--
      break;
    case 3:
      rollRotation = [Math.PI / 2, 0, 0]; //--
      break;
    case 4:
      rollRotation = [0, 0, Math.PI / 2]; //--
      break;
    case 5:
      rollRotation = [(Math.PI * 3) / 2, 0, 0]; //--
      break;
    case 6:
      rollRotation = [0, Math.PI / 2, 0]; //--
      break;
  }

  // animate dice roll and show result
  useFrame(() => {
    if (props.rotate) {
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
      // onClick={(_event) => setActive(!active)}
      // onPointerOver={(_event) => setHover(true)}
      // onPointerOut={(_event) => setHover(false)}
      material={materials}
      rotation={rollRotation}
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

export default function Dice3Dv2({
  roll1 = 1,
  roll2 = 1,
  rotate = false,
}: Dice3DProps) {
  return (
    <div id="canvas" className=" h-16">
      <Canvas camera={{ fov: 35, position: [0, -3, 0] }}>
        {/* <color attach="background" args={["white"]} /> */}
        <ambientLight intensity={0.7} />
        <pointLight position={[1, -3, 1]} />
        <Box2 position={[-1, 0, 0]} roll={roll1}  rotate={rotate} />
        <Box2 position={[1, 0, 0]} roll={roll2} rotate={rotate} />
      </Canvas>
    </div>
  );
}
