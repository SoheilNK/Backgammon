import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Box(props: JSX.IntrinsicElements["mesh"]) {
    const mesh = useRef() as React.MutableRefObject<THREE.Mesh>;

    const loader = new THREE.CubeTextureLoader();
    loader.setPath("textures/");

    const textureCube = loader.load([
        "dice_1.jpg",
        "dice_2.jpg",
        "dice_3.jpg",
        "dice_4.jpg",
        "dice_5.jpg",
        "dice_6.jpg",

        
        //   "px.png",

      //   "nx.png",
      //   "py.png",
      //   "ny.png",
      //   "pz.png",
      //   "nz.png",
    ]);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      envMap: textureCube,
    });
    
    



  useFrame(
    (state, delta) =>
      (mesh.current.rotation.x = mesh.current.rotation.y += 0.002)
  );

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 2.5 : 2}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial envMap={textureCube} color={"#f51d63"} />
    </mesh>
  );
}

export default function Dice3D() {
  return (
    <div className="h-80">
          <Canvas>
              <scene background={new THREE.Color("lightblue")} />
                  
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.5, 0, 0]} />
        <Box position={[1.5, 0, 0]} />
      </Canvas>
    </div>
  );
}
