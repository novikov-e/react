import {useEffect, useRef, useState} from 'react';
import {available, maxLength, minLength, regex, required} from '../validations';

// ??? Производительность данного компонента, и оптимизация - Проверить через логи
// Надо что бы при вводе в один инпут из всей формы не было ререндера и валидации всех остальных инпутов

export const useJsxInput = (
  id,
  name,
  type,
  placeholder,
  disabled = false,
  label,
  labelWidth,
  initialValue,
  validations,
  firstAvailable,
) => {
  console.log('render: ' + id);

  const currentInput = useRef();
  const [value, setValue] = useState(initialValue);
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    if (firstAvailable) {
      setValue(firstAvailable());
      setVisited(true);
    }
  }, []);

  const focus = () => {
    currentInput.current.focus();
  };

  const checkRequired = () => {
    setVisited(true);
  };

  /**
   * validation: {type: "", value: "", result:"", errorMessage: ""}
   */
  const validate = validations.map(validation => {
    switch (validation.type) {
      case 'available':
        validation.result = available(value, validation.value);
        return validation;
      case 'required':
        validation.result = required(value);
        return validation;
      case 'minLength':
        validation.result = minLength(value, validation.value);
        return validation;
      case 'maxLength':
        validation.result = maxLength(value, validation.value);
        return validation;
      case 'regex':
        validation.result = regex(value, validation.value);
        return validation;
      default:
        return validation;
    }
  });
  const validated = validate.reduce((all, validation) => all && validation.result);

  const className = () => {
    if (visited) {
      if (validated) {
        return 'custom-input';
      } else {
        return 'custom-input custom-input-warning';
      }
    } else {
      return 'custom-input';
    }
  };

  const jsx = () => {
    return (
      <div className="flex-row g-10 align-items-center">
        <label style={{width: labelWidth}}>{label}</label>
        <input
          ref={currentInput}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={className()}
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => setVisited(true)}
          disabled={disabled}
        />
        <div className="flex-column">
          {validate.map((validation, index) => (
            <div key={index} className="custom-input-error" hidden={!(!validation.result && visited)}>
              {validation.errorMessage}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return {jsx, value, validated, focus, checkRequired};
};
