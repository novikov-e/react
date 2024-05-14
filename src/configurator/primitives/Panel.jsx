import {useEffect, useRef} from 'react';
import {degToRad} from '../../utils/methods';

const butts = [
  {thickness: 0.5, material: {color: 'green'}},
  {thickness: 0.5, material: {color: 'cyan'}},
  {thickness: 0.5, material: {color: 'red'}},
  {thickness: 0.5, material: {color: 'gray'}},
];

export default function Panel({name, vertical, front, x, y, z, width, depth, thickness, material, rotate, butts}) {
  const frontSide = useRef();
  const backside = useRef();

  useEffect(() => {
    if (material.map) {
      if (rotate) {
        let verticalTexture = material.map.clone();
        verticalTexture.center.set(0.5, 0.5);
        verticalTexture.offset.set(0, 0);
        verticalTexture.rotation = degToRad(90);
        frontSide.current.map = verticalTexture;
        backside.current.map = verticalTexture;
      }
    }
    if (material.color) {
      frontSide.current.map = null;
      backside.current.map = null;
    }
    frontSide.current.needsUpdate = true;
    backside.current.needsUpdate = true;
  }, [material]);

  const top = useRef();
  const right = useRef();
  const bottom = useRef();
  const left = useRef();

  useEffect(() => {
    if (butts[0].material.color) top.current.map = null;
    top.current.needsUpdate = true;
    if (butts[1].material.color) right.current.map = null;
    right.current.needsUpdate = true;
    if (butts[2].material.color) bottom.current.map = null;
    bottom.current.needsUpdate = true;
    if (butts[3].material.color) left.current.map = null;
    left.current.needsUpdate = true;
  }, [butts]);

  const position = () => {
    if (vertical) return [(x + 8) / 1000, (z + width / 2) / 1000, y / 1000 + depth / 1000 / 2];
    else if (front) return [x / 1000 + width / 1000 / 2, (z + depth / 2) / 1000, (y + thickness / 2) / 1000];
    else return [x / 1000 + width / 1000 / 2, z / 1000 + thickness / 1000 / 2, y / 1000 + depth / 1000 / 2];
  };

  return (
    <mesh
      castShadow
      receiveShadow
      position={position()}
      rotation={[front ? degToRad(90) : 0, 0, vertical ? degToRad(90) : 0]}
    >
      <boxGeometry args={[width / 1000, thickness / 1000, depth / 1000]} />
      {/*верх*/}
      <meshStandardMaterial ref={top} attach="material-0" roughness={0.3} {...butts[0].material} />
      {/*низ*/}
      <meshStandardMaterial ref={bottom} attach="material-1" roughness={0.3} {...butts[2].material} />
      {/*фронт*/}
      <meshStandardMaterial ref={frontSide} attach="material-2" roughness={0.3} {...material} />
      {/*тыл*/}
      <meshStandardMaterial ref={backside} attach="material-3" roughness={0.3} {...material} />
      {/*право*/}
      <meshStandardMaterial ref={right} attach="material-4" roughness={0.3} {...butts[1].material} />
      {/*лево*/}
      <meshStandardMaterial ref={left} attach="material-5" roughness={0.3} {...butts[3].material} />
    </mesh>
  );
}
