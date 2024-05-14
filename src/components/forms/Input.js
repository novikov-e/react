import {useRef} from 'react';

export default function Input({id, name, type = 'text', placeholder, useInput}) {
  const ref = useRef();

  return (
    <input
      ref={ref}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={useInput.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
      value={useInput.value}
      onChange={e => useInput.onChange(e.target.value)}
      onBlur={useInput.onBlur}
    />
  );
}
