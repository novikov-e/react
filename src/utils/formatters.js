export function dateFormatter(date, delimiter = '.') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}${delimiter}${month}${delimiter}${year}`;
}

export function timeFormatter(date, delimiter = ':') {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}${delimiter}${minutes}${delimiter}${seconds}`;
}
