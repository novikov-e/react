import React, {useEffect, useState} from 'react';
import Counter from '../components/forms/Counter';
import Input from '../components/forms/Input';
import PhoneInput from '../components/forms/PhoneInput';
import Switch from '../components/forms/Switch';
import {useInput} from '../hooks/inputs/UseInput';
import {useIp} from '../hooks/inputs/UseIp';
import {usePhone} from '../hooks/inputs/UsePhone';
import {useNumberIntervalValidation} from '../hooks/intervals/UseNumberIntervalValidation';
import {useDateIntervalValidation} from '../hooks/intervals/UseDateIntervalValidation';
import {useTimeIntervalValidation} from '../hooks/intervals/UseTimeIntervalValidation';
import {useDateTimeIntervalValidation} from '../hooks/intervals/UseDateTimeIntervalValidation';
import {useJsxHook} from '../hooks/useJsxHook';
import {useJsxInput} from '../hooks/jsxInputs/useJsxInput';

// Стили списков
// Оформить настройки

export default function Forms(props) {
  const hookFirstAvailable = () => 'firstAvailable';
  const hookIsAvailable = () => true;
  const hook = useInput('', {
    isAvailable: hookIsAvailable,
    isEmpty: true,
    minLength: 3,
    maxLength: 15,
  });
  const emailRegex = /[A-Za-z0-9_\-.]+@[A-Za-z0-9]+[_\-.][A-Za-z0-9]+/;
  const email = useInput('', {isEmpty: true, regex: emailRegex});
  const counter = useInput('', {isEmpty: true});
  const ip = useIp('', {isEmpty: true, ip: true});
  const phone = usePhone('', {isEmpty: true});
  const date = useInput('', {isEmpty: true});
  const time = useInput('', {isEmpty: true});
  const select = useInput('', {isEmpty: true});

  const firstCounter = useInput('', {isEmpty: true});
  const secondCounter = useInput('', {isEmpty: true});
  const counterInterval = useNumberIntervalValidation(firstCounter, secondCounter);

  const firstDate = useInput('', {isEmpty: true});
  const secondDate = useInput('', {isEmpty: true});
  const dateInterval = useDateIntervalValidation(firstDate, secondDate);
  // console.log('dateInterval')
  // console.log(dateInterval)

  const firstTime = useInput('', {isEmpty: true});
  const secondTime = useInput('', {isEmpty: true});
  const timeInterval = useTimeIntervalValidation(firstTime, secondTime);
  // console.log('timeInterval')
  // console.log(timeInterval)

  const firstDateTimeDate = useInput('', {isEmpty: true});
  const firstDateTimeTime = useInput('', {isEmpty: true});
  const secondDateTimeDate = useInput('', {isEmpty: true});
  const secondDateTimeTime = useInput('', {isEmpty: true});
  const dateTimeInterval = useDateTimeIntervalValidation(
    firstDateTimeDate,
    firstDateTimeTime,
    secondDateTimeDate,
    secondDateTimeTime,
  );
  // console.log('dateTimeInterval')
  // console.log(dateTimeInterval)

  const [checked, setChecked] = useState(true);
  const [lastSwitchState, setLastSwitchState] = useState(undefined);
  const [switchState, setSwitchState] = useState('disable');

  const saveButtonActive = () => {
    if (
      hook.visited &&
      hook.validated.all &&
      counter.visited &&
      counter.validated.all &&
      email.visited &&
      email.validated.all &&
      ip.visited &&
      ip.validated.all &&
      phone.visited &&
      phone.validated.all &&
      date.visited &&
      date.validated.all &&
      time.visited &&
      time.validated.all &&
      select.visited &&
      select.validated.all
    ) {
      return false;
    }
    return true;
  };

  //Активность слайдера

  const switchHandleChange = () => {
    switch (switchState) {
      case 'disable':
        setSwitchState('waiting');
        setLastSwitchState('disable');
        break;
      case 'enable':
        setSwitchState('waiting');
        setLastSwitchState('enable');
        break;
      case 'waiting':
        if (lastSwitchState === 'disable') {
          setSwitchState('enable');
        } else if (lastSwitchState === 'enable') {
          setSwitchState('disable');
        }
        break;
      default:
    }
  };

  //Создание
  //  Обязательные поля заполнены корректно
  //Редактирование
  //  Неизменяемые поля(disabled) - Если одна и та же форма для заполнения и редактирования
  //  Обязательные поля заполнены корректно

  //Загрузка данных с сервера
  //Сохранений предыдущих настроек
  //Установка значений полям
  //Кнопка сохранить только после изменений
  //Обязательные поля посещены и заполнены

  /**
   * useForm
   * inputs = {
   *     {name:"test_input", type:"text"}
   * }
   */

  const [formData, setFormData] = useState({
    first: '',
    second: '',
  });

  const formHandleChange = event => {
    console.log(event.currentTarget);
    const {name, value} = event.target;
    console.log(name);
    console.log(value);
    setFormData(prev => {
      prev[name] = value;
      return {...prev};
    });
  };

  return (
    <div className="flex-column window-body-background-color p-10 g-10" style={{height: 'calc(100% - 35px'}}>
      <div className="flex-row g-10 align-items-center">
        <label htmlFor="text" style={{width: '70px'}}>
          Хук *
        </label>
        <input
          type="text"
          name="text"
          placeholder="Placeholder"
          style={{width: '250px'}}
          className={hook.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          value={hook.value}
          onChange={e => hook.onChange(e.target.value)}
          onBlur={hook.onBlur}
        />
        <div className="flex-column">
          {!hook.validated.available && <div className="custom-input-error">Данное значение не доступно</div>}
          {!hook.validated.isEmpty && <div className="custom-input-error">Поле не должно быть пустое</div>}
          {!hook.validated.minLength && <div className="custom-input-error">Длина не должна быть менее N символов</div>}
          {!hook.validated.maxLength && <div className="custom-input-error">Длина не должна превышать N символов</div>}
        </div>
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="input-1" style={{width: '70px'}}>
          Кол-во *
        </label>
        <Counter width={50} minValue={0} maxValue={10} useInput={counter} disabled={true} />
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="input-1" style={{width: '70px'}}>
          Интервал *
        </label>
        <Counter minValue={0} maxValue={10} width={50} useInput={firstCounter} />
        -
        <Counter minValue={0} maxValue={10} width={50} useInput={secondCounter} />
        <div className="flex-column">
          {!counterInterval && (
            <div className="custom-input-error">Неверно указан диапазон, исправьте пожалуйста промежуток</div>
          )}
        </div>
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="email" style={{width: '70px'}}>
          E-mail *
        </label>
        <input
          type="text"
          name="email"
          placeholder="mail@example.com"
          autoComplete="off"
          className={
            email.validated.regex && email.validated.isEmpty ? 'custom-input' : 'custom-input custom-input-warning'
          }
          value={email.value}
          style={{width: '250px'}}
          onChange={e => email.onChange(e.target.value)}
          onBlur={email.onBlur}
        />
      </div>

      <div className="flex-row g-10 align-items-center wrap">
        <label htmlFor="ip" style={{width: '70px'}}>
          IP адрес *
        </label>
        <input
          type="text"
          name="ip"
          placeholder="255.255.255.255"
          autoComplete="ip"
          className={ip.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          value={ip.value}
          style={{width: '250px'}}
          onChange={e => ip.onChange(e.target.value)}
          onBlur={ip.onBlur}
        />
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="input-1" style={{width: '70px'}}>
          Телефон *
        </label>
        <PhoneInput phone={phone} />
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="input-1" style={{width: '70px'}}>
          Дата
        </label>
        <input
          className={date.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="date"
          placeholder="Placeholder"
          value={date.value}
          onChange={e => date.onChange(e.target.value)}
          onBlur={date.onBlur}
        />
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="input-1" style={{width: '70px'}}>
          Дата
        </label>
        <input
          className={firstDate.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="date"
          placeholder="Placeholder"
          value={firstDate.value}
          onChange={e => firstDate.onChange(e.target.value)}
          onBlur={firstDate.onBlur}
        />
        -
        <input
          className={secondDate.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="date"
          placeholder="Placeholder"
          value={secondDate.value}
          onChange={e => secondDate.onChange(e.target.value)}
          onBlur={secondDate.onBlur}
        />
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="input-1" style={{width: '70px'}}>
          Время
        </label>
        <input
          className={time.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="time"
          placeholder="Placeholder"
          value={time.value}
          onChange={e => time.onChange(e.target.value)}
          onBlur={time.onBlur}
        />
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="input-1" style={{width: '70px'}}>
          Время
        </label>
        <input
          className={firstTime.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="time"
          placeholder="Placeholder"
          value={firstTime.value}
          onChange={e => firstTime.onChange(e.target.value)}
          onBlur={firstTime.onBlur}
        />
        -
        <input
          className={secondTime.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="time"
          placeholder="Placeholder"
          value={secondTime.value}
          onChange={e => secondTime.onChange(e.target.value)}
          onBlur={secondTime.onBlur}
        />
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="input-1" style={{width: '70px'}}>
          Дата
        </label>
        <input
          className={firstDateTimeDate.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="date"
          placeholder="Placeholder"
          value={firstDateTimeDate.value}
          onChange={e => firstDateTimeDate.onChange(e.target.value)}
          onBlur={firstDateTimeDate.onBlur}
        />
        <input
          className={firstDateTimeTime.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="time"
          placeholder="Placeholder"
          value={firstDateTimeTime.value}
          onChange={e => firstDateTimeTime.onChange(e.target.value)}
          onBlur={firstDateTimeTime.onBlur}
        />
        -
        <input
          className={secondDateTimeDate.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="date"
          placeholder="Placeholder"
          value={secondDateTimeDate.value}
          onChange={e => secondDateTimeDate.onChange(e.target.value)}
          onBlur={secondDateTimeDate.onBlur}
        />
        <input
          className={secondDateTimeTime.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          type="time"
          placeholder="Placeholder"
          value={secondDateTimeTime.value}
          onChange={e => secondDateTimeTime.onChange(e.target.value)}
          onBlur={secondDateTimeTime.onBlur}
        />
      </div>

      <div className="flex-row g-10 align-items-center">
        <label htmlFor="input-1" style={{width: '70px'}}>
          Select
        </label>
        <select
          className={select.validated.all ? 'custom-input' : 'custom-input custom-input-warning'}
          name="select"
          id="select"
          value={select.value}
          placeholder="Placeholder"
          onChange={e => select.onChange(e.target.value)}
          onBlur={select.onBlur}
        >
          <option value="">Значение по умолчанию</option>
          <optgroup label="Группа 1" />
          <option value="1">1</option>
          <option value="2">2</option>
          <optgroup label="Группа 2" />
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div className="flex-row g-10 align-items-center">
        <input
          id="checkbox"
          className="customCheckbox"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <label htmlFor="checkbox">Чек бокс</label>
      </div>
      <div className="flex-row g-10 align-items-center">
        <Switch state={switchState} onClick={switchHandleChange} />
      </div>

      <div className="flex-row g-10 align-items-center">
        <label className="switch-2">
          <input type="checkbox" />
          <span className="switch"></span>
        </label>
      </div>

      <button disabled={saveButtonActive()}>Сохранить</button>

      <form onChange={formHandleChange}>
        <input type="text" name="first" value={formData.first} />

        <input type="text" name="second" value={formData.second} />
      </form>
    </div>
  );
}
