import {useEffect, useState} from 'react';

export const useIpValidation = (value, validations) => {
  const [all, setAll] = useState(true);
  const [available, setAvailable] = useState(true);
  const [isEmpty, setEmpty] = useState(true);
  const [ip, setIp] = useState(true);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'available':
          setAvailable(validations[validation]());
          break;
        case 'isEmpty':
          value === '' && validations.visited ? setEmpty(false) : setEmpty(true);
          break;
        case 'ip':
          let values = value.split('.');
          if (values.length > 4) {
            setIp(false);
            break;
          }
          let validate = true;
          for (let i = 0; i < values.length; i++) {
            const value = Number(values[i]);
            if (isNaN(value) || value < 0 || value > 255) {
              validate = false;
              break;
            }
          }
          setIp(validate);
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
        case 'ip':
          all = all && ip;
          break;
        default:
      }
    }
    setAll(all);
  }, [available, isEmpty, ip]);

  return {available, isEmpty, ip, all};
};
