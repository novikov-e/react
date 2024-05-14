import {useEffect, useState} from 'react';
import {timeRegex} from '../Constants';

export const useTimeIntervalValidation = (firstTime, secondTime) => {
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (
      typeof firstTime.value === 'string' &&
      timeRegex.test(firstTime.value) &&
      firstTime.validated.all &&
      typeof secondTime.value === 'string' &&
      timeRegex.test(secondTime.value) &&
      secondTime.validated.all
    ) {
      setValidated(
        new Date(2011, 0, 1, firstTime.value.slice(0, 2), firstTime.value.slice(3, 5), 0, 0).getTime() <=
          new Date(2011, 0, 1, secondTime.value.slice(0, 2), secondTime.value.slice(3, 5), 0, 0).getTime(),
      );
    }
  }, [firstTime.value, secondTime.value]);

  return validated;
};
