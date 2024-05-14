import {useEffect, useState} from 'react';
import {useInputValidation} from './UseInputValidation';

export const useInput = (initialValue, validations, firstAvailable) => {
  const [value, setValue] = useState(initialValue);
  const [visited, setVisited] = useState(false);
  const {validated, checkRequired} = useInputValidation(value, {...validations, visited});

  useEffect(() => {
    if (firstAvailable) {
      setValue(firstAvailable());
      setVisited(true);
    }
    // if (initialValue !== "") {
    //     setVisited(true);
    // }
  }, []);

  const onChange = value => {
    setValue(value);
  };

  const onBlur = event => {
    setVisited(true);
  };

  return {value, onChange, onBlur, visited, validated, checkRequired};
};
