import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Box2(
  props: ThreeElements["mesh"] & {
    onRemainingTime: CallableFunction;
    roll: number;
    rotate: boolean;
    remainingTime: number;
  }
) {
  const mesh = useRef<THREE.Mesh>(null!);

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
    case 0:
      rollRotation = [Math.PI / 4, 0, Math.PI / 4]; //--
      break;
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
  // set random rotation for a duration of 1.5 second
  useFrame((_state, _delta) => {
    if (props.remainingTime > 0) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.1;

      props.onRemainingTime(props.remainingTime - 16); // 60 FPS
    } else {
      mesh.current.rotation.x = rollRotation[0];
      mesh.current.rotation.y = rollRotation[1];
      mesh.current.rotation.z = rollRotation[2];
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}
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
  remainingTime: number;
  onRemainingTime: CallableFunction;
  onClick?: CallableFunction;
}

export default function Dice3Dv4({
  roll1 = 1,
  roll2 = 1,
  rotate = false,
  remainingTime,
  onRemainingTime,
  onClick,
}: Dice3DProps) {
  return (
    <div id="canvas" className=" h-12 w-32">
      <Canvas camera={{ fov: 35, position: [0, -3, 0] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[1, -3, 1]} />
        <Box2
          position={[-1, 0, 0]}
          roll={roll1}
          rotate={rotate}
          remainingTime={remainingTime}
          onRemainingTime={onRemainingTime}
        />
        <Box2
          position={[1, 0, 0]}
          roll={roll2}
          rotate={rotate}
          remainingTime={remainingTime}
          onRemainingTime={onRemainingTime}
        />
      </Canvas>
    </div>
  );
}
