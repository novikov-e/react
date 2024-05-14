import {useGLTF} from '@react-three/drei';
import {useLoader} from '@react-three/fiber';
import {TextureLoader} from 'three';
import {useEffect} from 'react';
import {degToRad} from '../../lib/methods.js';

export default function PanelFromBlender(props) {
  const {nodes, materials} = useGLTF('/panel16.glb');
  // const [beton, kerpich, galka] = useLoader(TextureLoader, ['beton.jpg', 'kerpich.jpg', 'galka.jpg']);

  const initParams = {
    x: 0 / 1000,
    z: 0 / 1000,
    y: 0 / 1000,
    width: 300,
    depth: 300,
    height: 16,
  };
  // useEffect(() => {
  //     kerpich.center.set(0.5, 0.5);
  //     kerpich.offset.set(0, 0);
  //     kerpich.rotation = degToRad(90);
  // }, [kerpich, width, depth, height]);

  return (
    <group {...props} rotation={[0, 0, degrees_to_radians(90)]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.panel16.geometry}
        position={[initParams.x, initParams.y, initParams.z]}
        scale={[width / initParams.width, height / initParams.height, depth / initParams.depth]}
      >
        <meshStandardMaterial {...materials.Material} map={kerpich} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.butt16_right.geometry}
        position={[0.3 + initParams.x + (width - initParams.width) / 1000, initParams.z, initParams.y]}
        scale={[1, 1, depth / initParams.depth]}
      >
        <meshStandardMaterial {...materials.Material} color="green" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.butt16_left.geometry}
        position={[initParams.x, initParams.z, initParams.y - 0.3]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[1, 1, depth / initParams.depth]}
      >
        <meshStandardMaterial {...materials.Material} color="white" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.butt16_top.geometry}
        position={[0.3 + initParams.x, initParams.z, initParams.y - 0.3]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial {...materials.Material} color="black" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.butt16_bottom.geometry}
        position={[initParams.x, initParams.z, initParams.y]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial {...materials.Material} color="black" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.butt16_bottom_right.geometry}
        position={[initParams.x + 0.3, initParams.z, initParams.y]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshStandardMaterial {...materials.Material} color="black" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.butt16_top_left.geometry}
        position={[initParams.x, initParams.z, initParams.y - 0.3]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial {...materials.Material} color="black" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.butt16_top_right.geometry}
        position={[initParams.x + 0.3, initParams.z, initParams.y - 0.3]}
        rotation={[Math.PI, 0, Math.PI]}
      >
        <meshStandardMaterial {...materials.Material} color="black" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.butt16_bottom_left.geometry}
        position={[initParams.x, initParams.z, initParams.y]}
      >
        <meshStandardMaterial {...materials.Material} color="black" />
      </mesh>
    </group>
  );
}
useGLTF.preload('/panel16.glb');
