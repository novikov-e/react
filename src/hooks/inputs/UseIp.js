import {useState} from 'react';
import {useIpValidation} from './UseIpValidation';

export const useIp = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [visited, setVisited] = useState(false);
  const validated = useIpValidation(value, {...validations, visited});

  if (initialValue !== '') {
    setVisited(true);
  }

  const onChange = value => {
    setValue(value);
  };

  const onBlur = event => {
    setVisited(true);
  };

  return {value, validated, visited, onChange, onBlur};
};
