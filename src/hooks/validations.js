/**
 * Валидации
 * true - пройдена
 * false - не пройдена
 */

export const available = checkAvailable => {
  console.log('available');
  return checkAvailable();
};

export const required = value => {
  console.log('required()');
  return !(value === '');
};

export const minLength = (value, length) => {
  console.log('minLength()');
  return !(value.length < length);
};

export const maxLength = (value, length) => {
  console.log('maxLength');
  return !(value.length > length);
};

export const regex = (value, reg) => {
  console.log('regex');
  return reg.test(value);
};
