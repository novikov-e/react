import React from 'react';
import {useGLTF} from '@react-three/drei';

export default function Leg({x, y, z}) {
  const {nodes, materials} = useGLTF('/models/leg.glb');
  return (
    <group dispose={null}>
      <group position={[x / 1000, z / 1000, y / 1000]}>
        <mesh castShadow receiveShadow geometry={nodes.Cylinder003.geometry} material={materials['Material.002']} />
        <mesh castShadow receiveShadow geometry={nodes.Cylinder003_1.geometry} material={materials['Material.001']} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/leg.glb');
