import {ModelState} from '../configurator/ModelContext';
import {Canvas} from '@react-three/fiber';
import {Suspense} from 'react';
import Loader from '../configurator/Loader';
import {Center, OrbitControls} from '@react-three/drei';
import {Model} from '../configurator/Model';
import Interface from '../configurator/Interface';

export default function Configurator(props) {
  return (
    <ModelState>
      <Canvas gl={{antialias: true, preserveDrawingBuffer: true}} shadows camera={{position: [-2, 1, 3.6], fov: 30}}>
        <Suspense fallback={<Loader />}>
          <group position={[0, 0, 0]}>
            <Center>
              <Model />
            </Center>
          </group>
          <OrbitControls
          // makeDefault
          // minPolarAngle={0}
          // maxPolarAngle={Math.PI / 2}
          />
          {/*<Environment preset="dawn" background blur={1}/>*/}
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 1]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          {/*<pointLight position={[10, 10, 1]} decay={0} intensity={Math.PI}/>*/}
        </Suspense>
      </Canvas>
      <Interface />
    </ModelState>
  );
}
