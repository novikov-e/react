import {useContext, useEffect, useState} from 'react';
import {ModelContext} from './ModelContext.jsx';
import Panel from './primitives/Panel.jsx';
import Line from './primitives/Line.jsx';
import {useLoader} from '@react-three/fiber';
import {TextureLoader} from 'three';
import Handle from './furniture/Handle.jsx';
import Leg from './furniture/Leg.jsx';
import InsideRightHinge from './furniture/InsideRightHinge.jsx';
import OutsideLeftHinge from './furniture/OutsideLeftHinge.jsx';
import InsideLeftHinge from './furniture/InsideLeftHinge.jsx';
import OutsideRightHinge from './furniture/OutsideRightHinge.jsx';

//units - m
//Все типы панели дальней нижней левой точкой в начале координат

//Переехать на свой стиль
//Адаптив
// FIXME Удаление по середине из каунтера
// FIXME выдор одного и того же элемента в селекте
//Тестирование

//Если нет верхних или нижних фасадов, высота фасада + пол толщины полки
//Естественное расположение текстур
//Настройка фона и освещения

export function Model(props) {
  const [mainau, kendal, pacific, navarra] = useLoader(TextureLoader, [
    'mainau.jpg',
    'kendal.jpg',
    'pacific.jpg',
    'navarra.jpg',
  ]);
  const {
    width,
    depth,
    height,
    boxMaterial,
    boxButt,
    shelfCount,
    facadeType,
    sectionCount,
    firstSection,
    firstSectionMaterial,
    firstSectionButt,
    secondSection,
    secondSectionMaterial,
    secondSectionButt,
  } = useContext(ModelContext);

  const legHeight = 10;
  const plinthHeight = 80;

  const boxMaterialThickness = 16;
  const shelfMaterialThickness = 16;
  const facadeMaterialThickness = 16;

  const materials = {
    1: {color: 'white'},
    2: {color: 'gray'},
    3: {color: 'black'},
    4: {map: mainau},
    5: {map: kendal},
    6: {map: pacific},
    7: {map: navarra},
    8: {color: 'silver', transparent: true, opacity: 0.6},
  };

  const panelButts = materialIndex => {
    if (materialIndex == 0) {
      return [
        {thickness: 0.5, material: materials[boxMaterial]},
        {thickness: 0.5, material: materials[boxMaterial]},
        {thickness: 0.5, material: materials[boxMaterial]},
        {thickness: 0.5, material: materials[boxMaterial]},
      ];
    } else if (materialIndex == 8) {
      return [
        {thickness: 0, material: {color: 'silver', transparent: true, opacity: 0.6}},
        {thickness: 0, material: {color: 'silver', transparent: true, opacity: 0.6}},
        {thickness: 0, material: {color: 'silver', transparent: true, opacity: 0.6}},
        {thickness: 0, material: {color: 'silver', transparent: true, opacity: 0.6}},
      ];
    } else {
      return [
        {thickness: 0.5, material: materials[materialIndex]},
        {thickness: 0.5, material: materials[materialIndex]},
        {thickness: 0.5, material: materials[materialIndex]},
        {thickness: 0.5, material: materials[materialIndex]},
      ];
    }
  };

  const [shelves, setShelves] = useState([]);
  useEffect(() => {
    let shelves = [];
    const distanceBetweenShelves = (height - legHeight - plinthHeight - boxMaterialThickness * 2) / shelfCount;
    let currentShelfZPosition = legHeight + plinthHeight + boxMaterialThickness + distanceBetweenShelves;
    for (let i = 0; i < shelfCount - 1; i++) {
      shelves.push(currentShelfZPosition);
      currentShelfZPosition += distanceBetweenShelves;
    }
    setShelves(shelves);
  }, [shelfCount, height, width, depth]);

  const [facades, setFacades] = useState([]);
  const [hinges, setHinges] = useState([]);
  const [handles, setHandles] = useState([]);
  useEffect(() => {
    setHandles([]);
    setHinges([]);
    switch (facadeType) {
      case '0':
        setFacades([]);
        break;
      //Накладные
      case '1':
        switch (sectionCount) {
          //Количество секций 1
          case '1':
            const left = {
              x: 2,
              y: depth - facadeMaterialThickness,
              z: legHeight + plinthHeight + 2,
              width: width / 2 - 3,
              depth: height - legHeight - plinthHeight - 4,
              thickness: 16,
              material: materials[firstSectionMaterial],
              butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
            };
            const right = {
              x: width / 2 + 1,
              y: depth - facadeMaterialThickness,
              z: legHeight + plinthHeight + 2,
              width: width / 2 - 3,
              depth: height - legHeight - plinthHeight - 4,
              thickness: 16,
              material: materials[firstSectionMaterial],
              butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
            };
            setFacades([left, right]);
            handleOnFacade(left);
            handleOnFacade(right);
            break;
          //Количество секций 2
          case '2':
            switch (shelfCount) {
              //  Полок 5
              case 5:
                const topLeft5 = {
                  x: 2,
                  y: depth - facadeMaterialThickness,
                  z: shelves[1] + shelfMaterialThickness / 2 + 1,
                  width: width / 2 - 3,
                  depth: height - shelves[1] - shelfMaterialThickness / 2 - 4,
                  thickness: firstSectionMaterial != 8 ? 16 : 4,
                  material: materials[firstSectionMaterial],
                  butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
                };
                const topRight5 = {
                  x: width / 2 + 1,
                  y: depth - facadeMaterialThickness,
                  z: shelves[1] + shelfMaterialThickness / 2 + 1,
                  width: width / 2 - 3,
                  depth: height - shelves[1] - shelfMaterialThickness / 2 - 4,
                  thickness: firstSectionMaterial != 8 ? 16 : 4,
                  material: materials[firstSectionMaterial],
                  butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
                };
                const bottomLeft5 = {
                  x: 2,
                  y: depth - facadeMaterialThickness,
                  z: legHeight + plinthHeight + 2,
                  width: width / 2 - 3,
                  depth: height - legHeight - plinthHeight - 4 - topLeft5.depth - 3,
                  thickness: 16,
                  material: materials[secondSectionMaterial],
                  butts: secondSectionButt == 0 ? panelButts(secondSectionMaterial) : panelButts(secondSectionButt),
                };
                const bottomRight5 = {
                  x: width / 2 + 1,
                  y: depth - facadeMaterialThickness,
                  z: legHeight + plinthHeight + 2,
                  width: width / 2 - 3,
                  depth: height - legHeight - plinthHeight - 4 - topRight5.depth - 3,
                  thickness: 16,
                  material: materials[secondSectionMaterial],
                  butts: secondSectionButt == 0 ? panelButts(secondSectionMaterial) : panelButts(secondSectionButt),
                };
                let facades5 = [];
                if (firstSection) {
                  facades5 = [topLeft5, topRight5];
                  handleOnFacade(topLeft5, 'top');
                  handleOnFacade(topRight5, 'top');
                  if (firstSectionMaterial == 8) {
                    hingesOnFacade(topLeft5, 'left');
                    hingesOnFacade(topRight5, 'right');
                  }
                }
                if (secondSection) {
                  facades5 = [...facades5, bottomLeft5, bottomRight5];
                  handleOnFacade(bottomLeft5, 'bottom');
                  handleOnFacade(bottomRight5, 'bottom');
                }
                setFacades(facades5);
                break;
              //  Полок 6
              case 6:
                console.log(shelves[2]);
                const topLeft6 = {
                  x: 2,
                  y: depth - facadeMaterialThickness,
                  z: shelves[2] + shelfMaterialThickness / 2 + 1,
                  width: width / 2 - 3,
                  depth: height - shelves[2] - shelfMaterialThickness / 2 - 4,
                  thickness: firstSectionMaterial != 8 ? 16 : 4,
                  material: materials[firstSectionMaterial],
                  butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
                };
                const topRight6 = {
                  x: width / 2 + 1,
                  y: depth - facadeMaterialThickness,
                  z: shelves[2] + shelfMaterialThickness / 2 + 1,
                  width: width / 2 - 3,
                  depth: height - shelves[2] - shelfMaterialThickness / 2 - 4,
                  thickness: firstSectionMaterial != 8 ? 16 : 4,
                  material: materials[firstSectionMaterial],
                  butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
                };
                const bottomLeft6 = {
                  x: 2,
                  y: depth - facadeMaterialThickness,
                  z: legHeight + plinthHeight + 2,
                  width: width / 2 - 3,
                  depth: height - legHeight - plinthHeight - 4 - topLeft6.depth - 3,
                  thickness: 16,
                  material: materials[secondSectionMaterial],
                  butts: secondSectionButt == 0 ? panelButts(secondSectionMaterial) : panelButts(secondSectionButt),
                };
                const bottomRight6 = {
                  x: width / 2 + 1,
                  y: depth - facadeMaterialThickness,
                  z: legHeight + plinthHeight + 2,
                  width: width / 2 - 3,
                  depth: height - legHeight - plinthHeight - 4 - topLeft6.depth - 3,
                  thickness: 16,
                  material: materials[secondSectionMaterial],
                  butts: secondSectionButt == 0 ? panelButts(secondSectionMaterial) : panelButts(secondSectionButt),
                };
                let facades6 = [];
                if (firstSection) {
                  facades6 = [topLeft6, topRight6];
                  handleOnFacade(topLeft6, 'top');
                  handleOnFacade(topRight6, 'top');
                  if (firstSectionMaterial == 8) {
                    hingesOnFacade(topLeft6, 'left');
                    hingesOnFacade(topRight6, 'right');
                  }
                }
                if (secondSection) {
                  facades6 = [...facades6, bottomLeft6, bottomRight6];
                  handleOnFacade(bottomLeft6, 'bottom');
                  handleOnFacade(bottomRight6, 'bottom');
                }
                setFacades(facades6);
                break;
            }
            break;
        }
        break;
      //Вкладные
      case '2':
        switch (sectionCount) {
          //Количество секций 1
          case '1':
            const left = {
              x: 2 + boxMaterialThickness,
              y: depth - facadeMaterialThickness,
              z: legHeight + plinthHeight + 2,
              width: (width - boxMaterialThickness * 2) / 2 - 3,
              depth: height - legHeight - plinthHeight - 4 - boxMaterialThickness,
              thickness: 16,
              material: materials[firstSectionMaterial],
              butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
            };
            const right = {
              x: width / 2 + 1,
              y: depth - facadeMaterialThickness,
              z: legHeight + plinthHeight + 2,
              width: (width - boxMaterialThickness * 2) / 2 - 3,
              depth: height - legHeight - plinthHeight - 4 - boxMaterialThickness,
              thickness: 16,
              material: materials[firstSectionMaterial],
              butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
            };
            setFacades([left, right]);
            handleOnFacade(left);
            handleOnFacade(right);
            break;
          //Количество секций 2
          case '2':
            switch (shelfCount) {
              //  Полок 5
              case 5:
                const topLeft5 = {
                  x: 2 + boxMaterialThickness,
                  y: depth - facadeMaterialThickness,
                  z: shelves[1] + shelfMaterialThickness / 2 + 1,
                  width: (width - boxMaterialThickness * 2) / 2 - 3,
                  depth: height - shelves[1] - shelfMaterialThickness / 2 - 4 - boxMaterialThickness,
                  thickness: firstSectionMaterial != 8 ? 16 : 4,
                  material: materials[firstSectionMaterial],
                  butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
                };
                const topRight5 = {
                  x: width / 2 + 1,
                  y: depth - facadeMaterialThickness,
                  z: shelves[1] + shelfMaterialThickness / 2 + 1,
                  width: (width - boxMaterialThickness * 2) / 2 - 3,
                  depth: height - shelves[1] - shelfMaterialThickness / 2 - 4 - boxMaterialThickness,
                  thickness: firstSectionMaterial != 8 ? 16 : 4,
                  material: materials[firstSectionMaterial],
                  butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
                };
                const bottomLeft5 = {
                  x: 2 + boxMaterialThickness,
                  y: depth - facadeMaterialThickness,
                  z: legHeight + plinthHeight + 2,
                  width: (width - boxMaterialThickness * 2) / 2 - 3,
                  depth: height - legHeight - plinthHeight - 4 - topLeft5.depth - 3 - boxMaterialThickness,
                  thickness: 16,
                  material: materials[secondSectionMaterial],
                  butts: secondSectionButt == 0 ? panelButts(secondSectionMaterial) : panelButts(secondSectionButt),
                };
                const bottomRight5 = {
                  x: width / 2 + 1,
                  y: depth - facadeMaterialThickness,
                  z: legHeight + plinthHeight + 2,
                  width: (width - boxMaterialThickness * 2) / 2 - 3,
                  depth: height - legHeight - plinthHeight - 4 - topLeft5.depth - 3 - boxMaterialThickness,
                  thickness: 16,
                  material: materials[secondSectionMaterial],
                  butts: secondSectionButt == 0 ? panelButts(secondSectionMaterial) : panelButts(secondSectionButt),
                };
                let facades5 = [];
                if (firstSection) {
                  facades5 = [topLeft5, topRight5];
                  handleOnFacade(topLeft5, 'top');
                  handleOnFacade(topRight5, 'top');
                  if (firstSectionMaterial == 8) {
                    hingesOnFacade(topLeft5, 'left');
                    hingesOnFacade(topRight5, 'right');
                  }
                }
                if (secondSection) {
                  facades5 = [...facades5, bottomLeft5, bottomRight5];
                  handleOnFacade(bottomLeft5, 'bottom');
                  handleOnFacade(bottomRight5, 'bottom');
                }
                setFacades(facades5);
                break;
              //  Полок 6
              case 6:
                const topLeft6 = {
                  x: 2 + boxMaterialThickness,
                  y: depth - facadeMaterialThickness,
                  z: shelves[2] + shelfMaterialThickness / 2 + 1,
                  width: (width - boxMaterialThickness * 2) / 2 - 3,
                  depth: height - shelves[2] - shelfMaterialThickness / 2 - 4 - boxMaterialThickness,
                  thickness: firstSectionMaterial != 8 ? 16 : 4,
                  material: materials[firstSectionMaterial],
                  butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
                };
                const topRight6 = {
                  x: width / 2 + 1,
                  y: depth - facadeMaterialThickness,
                  z: shelves[2] + shelfMaterialThickness / 2 + 1,
                  width: (width - boxMaterialThickness * 2) / 2 - 3,
                  depth: height - shelves[2] - shelfMaterialThickness / 2 - 4 - boxMaterialThickness,
                  thickness: firstSectionMaterial != 8 ? 16 : 4,
                  material: materials[firstSectionMaterial],
                  butts: firstSectionButt == 0 ? panelButts(firstSectionMaterial) : panelButts(firstSectionButt),
                };
                const bottomLeft6 = {
                  x: 2 + boxMaterialThickness,
                  y: depth - facadeMaterialThickness,
                  z: legHeight + plinthHeight + 2,
                  width: (width - boxMaterialThickness * 2) / 2 - 3,
                  depth: height - legHeight - plinthHeight - 4 - topLeft6.depth - 3 - boxMaterialThickness,
                  thickness: 16,
                  material: materials[secondSectionMaterial],
                  butts: secondSectionButt == 0 ? panelButts(secondSectionMaterial) : panelButts(secondSectionButt),
                };
                const bottomRight6 = {
                  x: width / 2 + 1,
                  y: depth - facadeMaterialThickness,
                  z: legHeight + plinthHeight + 2,
                  width: (width - boxMaterialThickness * 2) / 2 - 3,
                  depth: height - legHeight - plinthHeight - 4 - topLeft6.depth - 3 - boxMaterialThickness,
                  thickness: 16,
                  material: materials[secondSectionMaterial],
                  butts: secondSectionButt == 0 ? panelButts(secondSectionMaterial) : panelButts(secondSectionButt),
                };
                let facades6 = [];
                if (firstSection) {
                  facades6 = [topLeft6, topRight6];
                  handleOnFacade(topLeft6, 'top');
                  handleOnFacade(topRight6, 'top');
                  if (firstSectionMaterial == 8) {
                    hingesOnFacade(topLeft6, 'left');
                    hingesOnFacade(topRight6, 'right');
                  }
                }
                if (secondSection) {
                  facades6 = [...facades6, bottomLeft6, bottomRight6];
                  handleOnFacade(bottomLeft6, 'bottom');
                  handleOnFacade(bottomRight6, 'bottom');
                }
                setFacades(facades6);
                break;
            }
            break;
        }
        break;
    }
  }, [
    shelves,
    facadeType,
    sectionCount,
    firstSection,
    firstSectionMaterial,
    firstSectionButt,
    secondSection,
    secondSectionMaterial,
    secondSectionButt,
    height,
    width,
    depth,
  ]);

  const classButts = [
    {material: {color: 'silver', transparent: true, opacity: 0.6}},
    {material: {color: 'silver', transparent: true, opacity: 0.6}},
    {material: {color: 'silver', transparent: true, opacity: 0.6}},
    {material: {color: 'silver', transparent: true, opacity: 0.6}},
  ];

  const handleOnFacade = (facade, type) => {
    setHandles(prev => {
      switch (type) {
        case 'top':
          prev.push({x: facade.x + facade.width / 2, y: facade.y + facade.thickness, z: facade.z + 50});
          break;
        case 'bottom':
          prev.push({x: facade.x + facade.width / 2, y: facade.y + facade.thickness, z: facade.z + facade.depth - 50});
          break;
        default:
          prev.push({x: facade.x + facade.width / 2, y: facade.y + facade.thickness, z: facade.z + facade.depth / 2});
      }
      return prev;
    });
  };

  const hingesOnFacade = (facade, type) => {
    const zs = [];
    if (facade.depth >= 1000) {
      zs[0] = facade.z + 100;
      zs[1] = facade.z + facade.depth / 2;
      zs[2] = facade.z + facade.depth - 100;
    } else {
      zs[0] = facade.z + 100;
      zs[2] = facade.z + facade.depth - 100;
    }
    setHinges(prev => {
      switch (type) {
        case 'left':
          switch (facadeType) {
            case '1':
              zs.forEach(z => prev.push(<OutsideLeftHinge x={34} y={depth + 12} z={z} />));
              break;
            case '2':
              zs.forEach(z => prev.push(<InsideLeftHinge x={34} y={depth + 12} z={z} />));
              break;
          }
          break;
        case 'right':
          switch (facadeType) {
            case '1':
              zs.forEach(z => prev.push(<OutsideRightHinge x={width - 40} y={depth + 12} z={z} />));
              break;
            case '2':
              zs.forEach(z => prev.push(<InsideRightHinge x={width - 40} y={depth + 12} z={z} />));
              break;
          }
          break;
      }
      return prev;
    });
  };

  return (
    <>
      {/*<Line start={[0, 0, 0]} end={[1, 0, 0]} color="red"/>*/}
      {/*<Line start={[0, 0, 0]} end={[0, 1, 0]} color="blue"/>*/}
      {/*<Line start={[0, 0, 0]} end={[0, 0, 1]} color="green"/>*/}

      {/*<Panel name="left" vertical x={0} y={0} z={legHeight}*/}
      {/*       width={height - boxMaterialThickness - legHeight} depth={facadeType != 1 ? depth : depth - facadeMaterialThickness} thickness={4}*/}
      {/*       material={{color: "silver", transparent: true, opacity: 0.6}} rotate butts={classButts}/>*/}

      <axesHelper args={[3]} />

      <Panel
        name="bottom"
        x={boxMaterialThickness}
        y={0}
        z={plinthHeight + legHeight}
        width={width - boxMaterialThickness * 2}
        depth={facadeType == 0 ? depth : depth - facadeMaterialThickness}
        thickness={16}
        material={materials[boxMaterial]}
        rotate
        butts={panelButts(boxButt)}
      />
      <Panel
        name="top"
        x={0}
        y={0}
        z={height - boxMaterialThickness}
        width={width}
        depth={facadeType != 1 ? depth : depth - facadeMaterialThickness}
        thickness={16}
        material={materials[boxMaterial]}
        rotate
        butts={panelButts(boxButt)}
      />
      <Panel
        name="left"
        vertical
        x={0}
        y={0}
        z={legHeight}
        width={height - boxMaterialThickness - legHeight}
        depth={facadeType != 1 ? depth : depth - facadeMaterialThickness}
        thickness={16}
        material={materials[boxMaterial]}
        rotate
        butts={panelButts(boxButt)}
      />
      <Leg x={boxMaterialThickness / 2} y={70} z={10} />
      <Leg x={boxMaterialThickness / 2} y={depth - 70} z={10} />
      <Panel
        name="right"
        vertical
        x={width - boxMaterialThickness}
        y={0}
        z={legHeight}
        width={height - boxMaterialThickness - legHeight}
        depth={facadeType != 1 ? depth : depth - facadeMaterialThickness}
        thickness={16}
        material={materials[boxMaterial]}
        rotate
        butts={panelButts(boxButt)}
      />
      <Leg x={width - boxMaterialThickness / 2} y={70} z={10} />
      <Leg x={width - boxMaterialThickness / 2} y={depth - 70} z={10} />
      <Panel
        name="backWall"
        front
        x={boxMaterialThickness}
        y={10}
        z={legHeight + plinthHeight + boxMaterialThickness}
        width={width - boxMaterialThickness * 2}
        depth={height - legHeight - plinthHeight - boxMaterialThickness * 2}
        thickness={3}
        material={materials[boxMaterial]}
        butts={panelButts(boxButt)}
      />
      <Panel
        name="plinth"
        front
        x={boxMaterialThickness}
        y={facadeType == 0 ? depth - 20 : depth - 20 - facadeMaterialThickness}
        z={legHeight}
        width={width - boxMaterialThickness * 2}
        depth={plinthHeight}
        thickness={16}
        material={materials[boxMaterial]}
        rotate
        butts={panelButts(boxButt)}
      />
      <Panel
        name="plinth"
        front
        x={boxMaterialThickness}
        y={10}
        z={legHeight}
        width={width - boxMaterialThickness * 2}
        depth={plinthHeight}
        thickness={16}
        material={materials[boxMaterial]}
        rotate
        butts={panelButts(boxButt)}
      />
      {shelves.map((z, index) => (
        <Panel
          key={index}
          name="bottom"
          x={boxMaterialThickness}
          y={13}
          z={z}
          width={width - boxMaterialThickness * 2}
          depth={facadeType == 0 ? depth - 13 : depth - facadeMaterialThickness - 13}
          thickness={16}
          material={materials[boxMaterial]}
          rotate
          butts={panelButts(boxButt)}
        />
      ))}
      {facades.map((facade, index) => (
        <Panel key={index} name="leftFacade" front {...facade} />
      ))}
      {handles.map((handle, index) => (
        <Handle key={index} {...handle} />
      ))}
      {hinges.map(hinge => hinge)}
    </>
  );
}
