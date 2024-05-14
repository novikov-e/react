import {createContext, useState} from 'react';

export const ModelContext = createContext({});

export const ModelState = ({children}) => {
  const [width, setWidth] = useState(600);
  const [depth, setDepth] = useState(360);
  const [height, setHeight] = useState(1800);
  const [boxMaterial, setBoxMaterial] = useState('1');
  const [boxButt, setBoxButt] = useState('0');
  const [shelfCount, setShelfCount] = useState(5);
  const [facadeType, setFacadeType] = useState('2');
  const [sectionCount, setSectionCount] = useState('2');
  const [firstSection, setFirstSection] = useState(false);
  const [firstSectionMaterial, setFirstSectionMaterial] = useState('8');
  const [firstSectionButt, setFirstSectionButt] = useState('0');
  const [secondSection, setSecondSection] = useState(true);
  const [secondSectionMaterial, setSecondSectionMaterial] = useState('7');
  const [secondSectionButt, setSecondSectionButt] = useState('0');

  return (
    <ModelContext.Provider
      value={{
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
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
