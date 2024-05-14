import {useFrame, useLoader} from '@react-three/fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {useRef} from 'react';

export default function Sphere(props) {
  const [sphere] = useLoader(GLTFLoader, ['scene.gltf']);
  const sphereRef = useRef();
  useFrame((state, delta) => (sphereRef.current.rotation.y += delta));
  return (
    <mesh {...props} ref={sphereRef} rotation={[1, 1, 1]}>
      <primitive object={sphere.scene} />
    </mesh>
  );
}
