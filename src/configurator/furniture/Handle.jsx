import React from 'react';
import {useGLTF} from '@react-three/drei';

export default function Handle({x, y, z}) {
  const {nodes, materials} = useGLTF('/models/handle160.glb');
  return (
    <mesh
      castShadow
      receiveShadow
      position={[x / 1000, z / 1000, y / 1000]}
      geometry={nodes.Cube.geometry}
      material={nodes.Cube.material}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

useGLTF.preload('/models/handle160.glb');
