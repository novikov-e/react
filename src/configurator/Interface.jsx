import React, {useContext} from 'react';
// import {Affix, Button, Card, Flex, Group, NumberInput, Text, Image, Select, Checkbox} from "@mantine/core";
// import {IconCamera} from '@tabler/icons-react';
import {ModelContext} from './ModelContext.jsx';

export default function Interface(props) {
  const {
    width,
    setWidth,
    depth,
    setDepth,
    height,
    setHeight,
    boxMaterial,
    setBoxMaterial,
    boxButt,
    setBoxButt,
    shelfCount,
    setShelfCount,
    facadeType,
    setFacadeType,
    sectionCount,
    setSectionCount,
    firstSection,
    setFirstSection,
    firstSectionMaterial,
    setFirstSectionMaterial,
    firstSectionButt,
    setFirstSectionButt,
    secondSection,
    setSecondSection,
    secondSectionMaterial,
    setSecondSectionMaterial,
    secondSectionButt,
    setSecondSectionButt,
  } = useContext(ModelContext);

  const screenshot = event => {
    const link = document.createElement('a');
    link.setAttribute('download', 'canvas.png');
    link.setAttribute(
      'href',
      document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'),
    );
    link.click();
  };

  const materials = [
    {value: '1', label: 'Белый', material: {color: 'white'}},
    {value: '2', label: 'Серый', material: {color: 'gray'}},
    // {value: '3', label: 'Чёрный', material: {color: "black"}},
    {value: '4', label: 'Берёза', material: {material: 'nut'}},
    {value: '5', label: 'Дуб', material: {material: 'oak'}},
    {value: '6', label: 'Орех', material: {material: 'birch'}},
    {value: '7', label: 'Ясень', material: {material: 'birch'}},
  ];

  const butts = [
    {value: '0', label: 'Материал корпуса'},
    {value: '1', label: 'Белый'},
    {value: '2', label: 'Серый'},
    // {value: '3', label: 'Чёрный'}
  ];

  const facadeMaterials = [
    {value: '1', label: 'Белый'},
    {value: '2', label: 'Серый'},
    // {value: '3', label: 'Чёрный'},
    {value: '4', label: 'Берёза'},
    {value: '5', label: 'Дуб'},
    {value: '6', label: 'Орех'},
    {value: '7', label: 'Ясень'},
    {value: '8', label: 'Стекло'},
  ];

  const facadeTypes = [
    {value: '0', label: 'Отсутствуют'},
    {value: '1', label: 'Накладные'},
    {value: '2', label: 'Вкладные'},
  ];

  const sectionCountHandleChange = event => {
    const {value} = event.target;
    if (value == 1 && firstSectionMaterial == 8) setFirstSectionMaterial(boxMaterial);
    setSectionCount(value);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', position: 'fixed', top: '70px', right: '20px', gap: '10px'}}>
      <label>Ширина</label>
      <input type="text" className="input" value={width} onChange={e => setWidth(e.target.value)} />

      <label>Глубина</label>
      <input type="text" className="input" value={depth} onChange={e => setDepth(e.target.value)} />

      <label>Высота</label>
      <input type="text" className="input" value={height} onChange={e => setHeight(e.target.value)} />

      <label>Материал корпуса</label>
      <select className="input" value={boxMaterial} onChange={e => setBoxMaterial(e.target.value)}>
        {materials.map(material => (
          <option key={material.value} value={material.value}>
            {material.label}
          </option>
        ))}
      </select>

      <label>Кол-во полок</label>
      <select className="input" value={shelfCount} onChange={e => setShelfCount(Number(e.target.value))}>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <label>Тип фасадов</label>
      <select className="input" value={facadeType} onChange={e => setFacadeType(e.target.value)}>
        <option value="0">Нет</option>
        <option value="1">Накладные</option>
        <option value="2">Вкладные</option>
      </select>

      {facadeType != 0 && (
        <>
          <label>Кол-во секций</label>
          <select className="input" value={sectionCount} onChange={sectionCountHandleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>

          {sectionCount == 1 && (
            <>
              <label>Материал фасадов</label>
              <select
                className="input"
                value={firstSectionMaterial}
                onChange={e => setFirstSectionMaterial(e.target.value)}
              >
                {materials.map(material => (
                  <option key={material.value} value={material.value}>
                    {material.label}
                  </option>
                ))}
              </select>
            </>
          )}

          {sectionCount == 2 && (
            <div className="flex-row g-10 align-items-center space-between">
              <label>Верхние фасады</label>
              <label className="switch-2">
                <input type="checkbox" checked={firstSection} onChange={() => setFirstSection(prev => !prev)} />
                <span className="switch"></span>
              </label>
            </div>
          )}

          {sectionCount == 2 && firstSection && (
            <>
              {/*<label>Материал</label>*/}
              <select
                className="input"
                value={firstSectionMaterial}
                onChange={e => setFirstSectionMaterial(e.target.value)}
              >
                {facadeMaterials.map(material => (
                  <option key={material.value} value={material.value}>
                    {material.label}
                  </option>
                ))}
              </select>
            </>
          )}

          {/*{sectionCount == 2 &&*/}
          {/*    <div className="flex-row g-10 align-items-center space-between">*/}
          {/*        <label>Нижние фасады</label>*/}
          {/*        <label className="switch-2">*/}
          {/*            <input type="checkbox" checked={secondSection} onChange={() => setSecondSection(prev => !prev)}/>*/}
          {/*            <span className="switch"></span>*/}
          {/*        </label>*/}
          {/*    </div>}*/}

          {sectionCount == 2 && secondSection && (
            <>
              <label>Нижние фасады</label>
              <select
                className="input"
                value={secondSectionMaterial}
                onChange={e => setSecondSectionMaterial(e.target.value)}
              >
                {materials.map(material => (
                  <option key={material.value} value={material.value}>
                    {material.label}
                  </option>
                ))}
              </select>
            </>
          )}
        </>
      )}

      <button className="button">Скриншот</button>
    </div>
    // <Affix position={{top: 20, right: 20}}>
    //     <Card shadow="sm" padding="lg" radius="md">
    //         <Card.Section>
    //             {/*<Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"*/}
    //             {/*       height={160} alt="Norway"/>*/}
    //         </Card.Section>
    //
    //         <Group justify="space-between" mt="md" mb="xs">
    //             <Flex direction="column" gap="5px">
    //                 <Flex direction="row" align="center" gap="10px">
    //                     <NumberInput label="Ширина" value={width} onChange={setWidth} style={{width: "180px"}}/>
    //                 </Flex>
    //                 <Flex direction="row" align="center" gap="10px">
    //                     <NumberInput label="Глубина" value={depth} onChange={setDepth} style={{width: "180px"}}/>
    //                 </Flex>
    //                 <Flex direction="row" align="center" gap="10px">
    //                     <NumberInput label="Высота" value={height} onChange={setHeight} style={{width: "180px"}}/>
    //                 </Flex>
    //                 <Flex direction="row" align="center" gap="10px">
    //                     <Select label="Материал корпуса" data={materials}
    //                             value={boxMaterial} onChange={setBoxMaterial} style={{width: "180px"}}/>
    //                 </Flex>
    //                 {/*<Flex direction="row" align="center" gap="10px">*/}
    //                 {/*    <Select label="Кромка корпуса" data={butts} value={boxButt} onChange={setBoxButt} style={{width: "180px"}}/>*/}
    //                 {/*</Flex>*/}
    //                 <Flex direction="row" align="center" gap="10px">
    //                     <NumberInput label="Кол-во полок" value={shelfCount} onChange={setShelfCount} style={{width: "180px"}} min={5} max={6}/>
    //                 </Flex>
    //                 <Flex direction="row" align="center" gap="10px">
    //                     <Select label="Тип фасадов" data={facadeTypes} value={facadeType} onChange={setFacadeType} style={{width: "180px"}}/>
    //                 </Flex>
    //                 {facadeType != 0 ? <>
    //                     <Flex direction="row" align="center" gap="10px">
    //                         <Select label="Кол-во секций" data={['1', '2']} value={sectionCount} onChange={setSectionCount} style={{width: "180px"}}/>
    //                     </Flex>
    //
    //                     {sectionCount != 1 ?
    //                         <Flex direction="row" justify="center">
    //                             <Checkbox label="Верхние фасады"
    //                                       checked={firstSection} onChange={(event) => setFirstSection(event.currentTarget.checked)}/>
    //                         </Flex> : null}
    //                     {sectionCount == 1 ?
    //                         <>
    //                             <Text size="md" c="dimmed" style={{textAlign: "center"}}>Фасады</Text>
    //                             <Flex direction="row" align="center" gap="10px">
    //                                 <Select label="Материал" data={materials} value={firstSectionMaterial} onChange={setFirstSectionMaterial} style={{width: "180px"}}/>
    //                             </Flex>
    //                             {/*<Flex direction="row" align="center" gap="10px">*/}
    //                             {/*    <Select label="Кромка" data={butts} value={firstSectionButt} onChange={setFirstSectionButt} style={{width: "180px"}}/>*/}
    //                             {/*</Flex>*/}
    //                         </> : null}
    //
    //
    //                     {sectionCount == 2 ?
    //                         <>
    //                             {firstSection ?
    //                                 <>
    //                                     <Flex direction="row" align="center" gap="10px">
    //                                         <Select label="Материал" data={facadeMaterials} value={firstSectionMaterial} onChange={setFirstSectionMaterial} style={{width: "180px"}}/>
    //                                     </Flex>
    //                                     {/*{firstSectionMaterial != 8 ?*/}
    //                                     {/*    <Flex direction="row" align="center" gap="10px">*/}
    //                                     {/*    <Select label="Кромка" data={butts} value={firstSectionButt} onChange={setFirstSectionButt} style={{width: "180px"}}/>*/}
    //                                     {/*</Flex> : null}*/}
    //                                 </> : null}
    //                             <Flex direction="row" justify="center">
    //                                 <Checkbox label="Нижние фасады"
    //                                           checked={secondSection} onChange={(event) => setSecondSection(event.currentTarget.checked)}/>
    //                             </Flex>
    //                             {secondSection ?
    //                                 <>
    //                                     <Flex direction="row" align="center" gap="10px">
    //                                         <Select label="Материал" data={materials} value={secondSectionMaterial} onChange={setSecondSectionMaterial} style={{width: "180px"}}/>
    //                                     </Flex>
    //                                     {/*<Flex direction="row" align="center" gap="10px">*/}
    //                                     {/*    <Select label="Кромка" data={butts} value={secondSectionButt} onChange={setSecondSectionButt} style={{width: "180px"}}/>*/}
    //                                     {/*</Flex>*/}
    //                                 </> : null}
    //                         </> : null}
    //                 </> : null}
    //             </Flex>
    //         </Group>
    //
    //         <Button rightSection={<IconCamera size={20}/>} onClick={screenshot}>Скриншот</Button>
    //     </Card>
    // </Affix>
  );
}
