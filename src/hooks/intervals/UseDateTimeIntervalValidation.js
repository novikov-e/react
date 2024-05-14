import {useEffect, useState} from 'react';
import {dateRegex, timeRegex} from '../Constants';

export const useDateTimeIntervalValidation = (firstDate, firstTime, secondDate, secondTime) => {
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (
      typeof firstDate.value === 'string' &&
      dateRegex.test(firstDate.value) &&
      firstDate.validated.all &&
      typeof firstTime.value === 'string' &&
      timeRegex.test(firstTime.value) &&
      firstTime.validated.all &&
      typeof secondDate.value === 'string' &&
      dateRegex.test(secondDate.value) &&
      secondDate.validated.all &&
      typeof secondTime.value === 'string' &&
      timeRegex.test(secondTime.value) &&
      secondTime.validated.all
    ) {
      setValidated(
        new Date(
          firstDate.value.slice(0, 4),
          firstDate.value.slice(5, 7),
          firstDate.value.slice(8, 10),
          firstTime.value.slice(0, 2),
          firstTime.value.slice(3, 5),
          0,
          0,
        ).getTime() <=
          new Date(
            secondDate.value.slice(0, 4),
            secondDate.value.slice(5, 7),
            secondDate.value.slice(8, 10),
            secondTime.value.slice(0, 2),
            secondTime.value.slice(3, 5),
            0,
            0,
          ).getTime(),
      );
    }
  }, [firstDate, firstTime, secondDate, secondTime]);

  return validated;
};
