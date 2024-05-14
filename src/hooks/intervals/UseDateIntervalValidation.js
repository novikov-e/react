import {useEffect, useState} from 'react';
import {dateRegex} from '../Constants';

export const useDateIntervalValidation = (firstDate, secondDate) => {
  const [validated, setValidated] = useState(true);

  useEffect(() => {
    if (
      firstDate.value !== '' &&
      dateRegex.test(firstDate.value) &&
      firstDate.validated.all &&
      secondDate.value !== '' &&
      dateRegex.test(secondDate.value) &&
      secondDate.validated.all
    ) {
      setValidated(new Date(firstDate.value).getTime() <= new Date(secondDate.value).getTime());
    }
  }, [firstDate.value, secondDate.value]);

  return validated;
};
