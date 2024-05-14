import React, {useRef, useState} from 'react';

function PhoneInput({phone}) {
  const phoneRef = useRef();
  const [focus, setFocus] = useState(false);

  const className = () => {
    let className = 'custom-input flex-row align-items-center';
    if (focus) {
      className += ' custom-input-active';
    }
    if (!phone.validated.all) {
      className += ' custom-input-warning';
    }
    return className;
  };

  return (
    <div
      className={className()}
      style={{width: phone.width ? phone.width : '110px'}}
      onClick={() => setFocus(!focus)}
      onBlur={() => {
        setFocus(false);
        phone.onBlur();
      }}
    >
      <div className="custom-phone-input-container" onClick={() => phoneRef.current.focus()}>
        <div>{phone.formattedPhone}</div>
        <div className="custom-phone-input-placeholder" style={{}}>
          {phone.placeholder}
        </div>
      </div>
      <input
        ref={phoneRef}
        type="text"
        className="custom-phone-input"
        value={phone.phone}
        onChange={e => phone.onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
}

export default PhoneInput;
