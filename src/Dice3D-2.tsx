import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";

import { TextureLoader } from "three/src/loaders/TextureLoader.js";

import { Box } from "@react-three/drei"



export function Dice2() {
  const texture1 = useLoader(TextureLoader, 'textures/dice_1.jpg')
  const texture2 = useLoader(TextureLoader, 'textures/dice_2.jpg')
  const texture3 = useLoader(TextureLoader, 'textures/dice_3.jpg')
  const texture4 = useLoader(TextureLoader, 'textures/dice_4.jpg')
  const texture5 = useLoader(TextureLoader, 'textures/dice_5.jpg')
  const texture6 = useLoader(TextureLoader, 'textures/dice_6.jpg')
  const textures = [texture1, texture2, texture3, texture4, texture5, texture6] as THREE.Texture[]

  function MyBox() {
    const ref = useRef() as React.MutableRefObject<THREE.Mesh>;
    useFrame(() => {
      ref.current.rotation.x = ref.current.rotation.y += 0.007;
    });
    return (
      <Box ref={ref}>
        <boxGeometry args={[2, 2, 2]}
          attachArray="geometry"
          
        
        />


        {/* <meshStandardMaterial 
          color="orange"
          attachArray="material"
          map={texture1}
        />
        <meshStandardMaterial
          color="blue"
          attachArray="material"
          map={texture2}
        />
 */}
        {/* <meshStandardMaterial attachArray="material" map={texture2} />
        <meshStandardMaterial attachArray="material" map={texture3} />
        <meshStandardMaterial attachArray="material" map={texture4} />
        <meshStandardMaterial attachArray="material" map={texture5} />
        <meshStandardMaterial attachArray="material" map={texture6} /> */}
      </Box>
    );
  }
    


  
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MyBox />
    </Canvas>
  );
}



function Box1() {
  const texture_1 = useLoader(TextureLoader, 'textures/dice_1.jpg')
  const texture_2 = useLoader(TextureLoader, 'textures/dice_2.jpg')
  const texture_3 = useLoader(TextureLoader, 'textures/dice_3.jpg')
  const texture_4 = useLoader(TextureLoader, 'textures/dice_4.jpg')
  const texture_5 = useLoader(TextureLoader, 'textures/dice_5.jpg')
  const texture_6 = useLoader(TextureLoader, 'textures/dice_6.jpg')



  const mesh = useRef() as React.MutableRefObject<THREE.Mesh>
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.002
  })
//how to assign textures to each face of the cube?
  
  

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[2, 2, 2]} />
      {/* <sphereGeometry attachArray="geometry" /> */}
      <meshStandardMaterial map={texture_1} attachArray="material" />
      <meshStandardMaterial map={texture_2} attachArray="material" />
      <meshStandardMaterial map={texture_3} attachArray="material" />
      <meshStandardMaterial map={texture_4} attachArray="material" />
      <meshStandardMaterial map={texture_5} attachArray="material" />
      <meshStandardMaterial map={texture_6} attachArray="material" />
    </mesh>
  );
    return (
      <mesh ref={mesh}>
        <boxGeometry attachArray="geometry" />
        {/* <sphereGeometry attachArray="geometry" /> */}
        <meshStandardMaterial map={texture_1} attachArray="material" />
        {/* <meshStandardMaterial map={texture_2} attachArray="material" />
      <meshStandardMaterial map={texture_3} attachArray="material" />
      <meshStandardMaterial map={texture_4} attachArray="material" />
      <meshStandardMaterial map={texture_5} attachArray="material" />
      <meshStandardMaterial map={texture_6} attachArray="material" /> */}
      </mesh>
    );

}
export default function Dice3D() {
  return (
    <div className="h-screen">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Suspense fallback={null}>
          <Box1 />
        </Suspense>
      </Canvas>
    </div>
  );
}
