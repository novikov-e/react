import {useEffect, useState} from 'react';

export const useNumberIntervalValidation = (firstValue, secondValue) => {
  const [validated, setValidated] = useState(true);

  useEffect(() => {
    if (
      typeof firstValue.value === 'number' &&
      firstValue.validated.all &&
      typeof secondValue.value === 'number' &&
      secondValue.validated.all
    ) {
      setValidated(firstValue.value <= secondValue.value);
    }
  }, [firstValue.value, secondValue.value]);
  return validated;
};
