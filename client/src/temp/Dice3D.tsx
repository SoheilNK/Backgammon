import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
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

  const texturePaths = [
    "textures/dice_2.jpg",
    "textures/dice_4.jpg",
    "textures/dice_1.jpg",
    "textures/dice_6.jpg",
    "textures/dice_3.jpg",
    "textures/dice_5.jpg",
  ];

  const textureIndex = props.roll - 1; // roll is 1-indexed
  const texture = useLoader(TextureLoader, texturePaths[textureIndex]);

  const materials = useMemo(
    () =>
      Array(6)
        .fill(0)
        .map((_, i) =>
          i === textureIndex
            ? new THREE.MeshStandardMaterial({ map: texture, color: "white" })
            : new THREE.MeshStandardMaterial({
                color: hovered ? "hotpink" : "#e3dac9",
              })
        ),
    [texture, hovered, textureIndex]
  );

  useFrame((_state, delta) => {
    if (active || hovered) {
      mesh.current.rotation.x += 0.5 * delta;
      mesh.current.rotation.y += 0.5 * delta;
    }
    if (props.rotate) {
      mesh.current.rotation.z += 0.5 * delta;
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

export default function Dice3D({
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
