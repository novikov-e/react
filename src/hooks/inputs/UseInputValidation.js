import {useEffect, useState} from 'react';

export const useInputValidation = (value, validations) => {
  const [all, setAll] = useState(true);
  const [available, setAvailable] = useState(true);
  const [isEmpty, setEmpty] = useState(true);
  const [minLength, setMinLength] = useState(true);
  const [maxLength, setMaxLength] = useState(true);
  const [regex, setRegex] = useState(true);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'available':
          setAvailable(validations[validation]());
          break;
        case 'isEmpty':
          //Если поле пустое и посещено
          value === '' && validations.visited ? setEmpty(false) : setEmpty(true);
          break;
        case 'minLength':
          value.length < validations[validation] ? setMinLength(false) : setMinLength(true);
          break;
        case 'maxLength':
          value.length > validations[validation] ? setMaxLength(false) : setMaxLength(true);
          break;
        case 'regex':
          value !== '' && setRegex(validations[validation].test(value));
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
        case 'maxLength':
          all = all && maxLength;
          break;
        case 'regex':
          all = all && regex;
          break;
        default:
      }
    }
    setAll(all);
  }, [available, isEmpty, minLength, maxLength, regex]);

  const checkRequired = () => {};

  return {validated: {available, isEmpty, minLength, maxLength, regex, all}, checkRequired};
};
