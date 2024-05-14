import {useState} from 'react';
import {usePhoneValidation} from './UsePhoneValidation';

const phoneTemplate = '+7(000)000-00-00';
const symbols = {0: '+', 2: '(', 6: ')', 10: '-', 13: '-'};

export const usePhone = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [phone, setPhone] = useState('+');
  const [formattedPhone, setFormattedPhone] = useState('+');
  const [placeholder, setPlaceholder] = useState('7(000)000-00-00');
  const [visited, setVisited] = useState(false);
  const validated = usePhoneValidation(value, {...validations, minLength: 11, visited});

  const onChange = value => {
    if (value.length > 1 && value.length < 17) {
      let formattedPhone;
      if (value.length > phone.length) {
        if (symbols[value.length]) {
          formattedPhone = value + symbols[value.length];
        } else {
          formattedPhone = value;
        }
      } else if (value.length < phone.length) {
        if (symbols[value.length]) {
          formattedPhone = value;
          formattedPhone = formattedPhone.slice(0, value.length - 1);
        } else {
          formattedPhone = value;
        }
      }
      let cleanPhone = '';
      for (let i = 0; i < formattedPhone.length; i++) {
        if (!isNaN(Number(formattedPhone[i]))) {
          cleanPhone += formattedPhone[i];
        }
      }
      setValue(cleanPhone);
      setPhone(formattedPhone);
      setFormattedPhone(formattedPhone);
      setPlaceholder(phoneTemplate.slice(formattedPhone.length));
    }
  };

  const onBlur = event => {
    setVisited(true);
  };

  return {value, phone, formattedPhone, placeholder, onChange, onBlur, visited, validated};
};
