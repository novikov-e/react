import {useLayoutEffect, useRef} from 'react';
import * as THREE from 'three';

export default function Line({start, end, color}) {
  const ref = useRef();
  useLayoutEffect(() => {
    ref.current.setFromPoints([start, end].map(point => new THREE.Vector3(...point)));
  }, [start, end]);
  return (
    <line>
      <bufferGeometry ref={ref} />
      <lineBasicMaterial color={color} />
    </line>
  );
}
