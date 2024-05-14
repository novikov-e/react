import {memo, useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useState} from 'react';

export default function HooksLifeCycle({undefinedProps, list, addItem}) {
  console.log('HooksLifeCycle');
  const [checked, toggle] = useReducer(checked => !checked, false);
  const [value, setValue] = useState('');
  const [firstList, setFirstList] = useState([]);
  const [secondList, setSecondList] = useState([]);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  }, []);

  useEffect(() => {
    console.log('useEffect');
    //Вызывается при удалении компонента из дерева
    return () => console.log('Компонент был удалён из дерева');
  }, []);

  const testRenderFunction = useCallback(() => {
    console.log('testRenderFunction');
    return <div>Test render function</div>;
  }, []);

  // Асинхронный useEffect
  // useEffect(() => {
  //     const fn = async () => {
  //         await new Promise();
  //     }
  //     fn();
  // })
  //
  // useEffect(() => {
  //     (async () => {
  //         await new Promise();
  //     })();
  // })

  const saveInFirstList = () => {
    setFirstList([...firstList, value]);
    setValue('');
  };

  const saveInSecondList = () => {
    setSecondList([...secondList, value]);
    setValue('');
  };

  //useCallback
  const [counter, setCounter] = useState(0);
  const [counterTwo, setCounterTwo] = useState(0);

  const updateOne = () => console.log('Я не мемоизирован');
  const updateTwo = useCallback(() => console.log('Я мемоизирован!'), [counter]);

  return (
    <div className="flex-column">
      <div>HooksLifeCycle</div>
      <div className="flex-row">
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={saveInFirstList}>Save in first list</button>
        <button onClick={saveInSecondList}>Save in second list</button>
      </div>
      <div className="flex-row">
        <div className="flex-column">
          <div>First list</div>
          {firstList.map((item, index) => (
            <ListItem key={index} name={item} />
          ))}
        </div>
        <div className="flex-column">
          <div>Second list</div>
          {secondList.map(item => (
            <div>{item}</div>
          ))}
        </div>
      </div>
      <div>
        <input type="checkbox" value={checked} onChange={toggle} />
        Чекбокс
      </div>
      <button onClick={testRenderFunction}>testRenderFunction</button>
      {/*useCallback*/}
      <div>
        <button onClick={() => setCounter(counter + 1)}>One</button>
        <button onClick={() => setCounterTwo(counterTwo + 1)}>Two</button>
        <Child updateOne={updateOne} updateTwo={updateTwo} />
      </div>

      {/*{testRenderFunction}*/}
      {/*Всплытие*/}
      {/*<form onClick={() => alert('form')}>FORM*/}
      {/*    <div onClick={() => alert('div')}>DIV*/}
      {/*        <p onClick={() => alert('p')}>P</p>*/}
      {/*    </div>*/}
      {/*</form>*/}
      <button onClick={undefinedProps && undefinedProps}>Click</button>
    </div>
  );
}

const ListItem = memo(({name}) => {
  console.log(`rendering ${name}`);
  return <div>{name}</div>;
});

function Child({updateOne, updateTwo}) {
  useEffect(() => {
    updateOne();
  }, [updateOne]);

  useEffect(() => {
    updateTwo();
  }, [updateTwo]);

  return <div className="App" />;
}
