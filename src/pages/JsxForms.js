import React from 'react';
import {useJsxInput} from '../hooks/jsxInputs/useJsxInput';

export default function JsxForms(props) {
  //validation: {type: "", value: "", result:"", errorMessage: ""}
  const testJsxInputValidations = [
    {type: 'required', result: false, errorMessage: 'Поле обязательно для заполнения'},
    {type: 'minLength', value: 3, result: false, errorMessage: 'Длина не должна быть меньше 3 символов'},
  ];
  const testJsxInput = useJsxInput(
    'test_id',
    'test_name',
    'text',
    'test_placeholder',
    false,
    'Label *',
    '70px',
    '',
    testJsxInputValidations,
  );

  const save = () => {};

  return (
    <div>
      {testJsxInput.jsx()}
      <button className="button" onClick={testJsxInput.focus}>
        focus()
      </button>
      <button className="button" onClick={save}>
        Сохранить
      </button>
      <button className="button" onClick={() => console.log(testJsxInput.validated)}>
        validated()
      </button>
    </div>
  );
}
