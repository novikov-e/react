import {useRef, useState} from 'react';

export const useJsxHook = () => {
  const [value, setValue] = useState(0);
  const currentInput = useRef();

  const focus = () => {
    currentInput.current.focus();
  };
  const increment = () => {
    setValue(prev => prev + 1);
  };

  const decrement = () => {
    setValue(prev => prev - 1);
  };

  const jsx = <input ref={currentInput} className="custom-input" value={value} />;

  return {jsx, increment, decrement, focus};
};
