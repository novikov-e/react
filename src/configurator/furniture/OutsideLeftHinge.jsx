import React from 'react';
import {useGLTF} from '@react-three/drei';

export default function OutsideLeftHinge({x, y, z}) {
  const {nodes, materials} = useGLTF('/models/hinge2.glb');
  return (
    <group position={[x / 1000, z / 1000, y / 1000]} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials['Material.001']}
        position={[0.003, 0, -0.02]}
        rotation={[0, -Math.PI / 2, -Math.PI / 2]}
      />
    </group>
  );
}

useGLTF.preload('/models/hinge2.glb');
