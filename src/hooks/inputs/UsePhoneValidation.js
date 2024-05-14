import {useEffect, useState} from 'react';

export const usePhoneValidation = (value, validations) => {
  const [all, setAll] = useState(true);
  const [available, setAvailable] = useState(true);
  const [isEmpty, setEmpty] = useState(true);
  const [minLength, setMinLength] = useState(true);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'available':
          setAvailable(validations[validation]());
          break;
        case 'isEmpty':
          value === '' && validations.visited ? setEmpty(false) : setEmpty(true);
          break;
        case 'minLength':
          validations.visited && value.length < validations[validation] ? setMinLength(false) : setMinLength(true);
          break;
        default:
      }
    }
  }, [value, validations.visited]);

  useEffect(() => {
    let all = true;
    for (const validation in validations) {
      switch (validation) {
        case 'available':
          all = all && available;
          break;
        case 'isEmpty':
          all = all && isEmpty;
          break;
        case 'minLength':
          all = all && minLength;
          break;
        default:
      }
    }
    setAll(all);
  }, [available, isEmpty, minLength]);

  return {available, isEmpty, minLength, all};
};
