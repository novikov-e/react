import {useEffect, useState} from 'react';

export const useForm = (data, loadPath, savePath) => {
  const [primaryData, setPrimaryData] = useState({});

  const handleChange = event => {
    const {name, value} = event.target;
    data[name].onChange(Number(value));
  };

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    // getRequest(SERVER_URL + loadPath, serverData => {
    //     for (const [key, value] of Object.entries(serverData)) {
    //         data[key].onChange(value)
    //     }
    //     setPrimaryData(serverData);
    // });
  };

  const save = () => {
    const send = {};
    for (const key of Object.keys(primaryData)) {
      send[key] = data[key].value;
    }
    // putRequest(SERVER_URL + savePath, send, load);
  };

  const cancel = () => {
    for (const [key, value] of Object.entries(primaryData)) {
      data[key].onChange(value);
    }
  };

  const changed = () => {
    let changed = false;
    let validated = true;
    for (const [key, value] of Object.entries(primaryData)) {
      if (!changed) {
        if (data[key].value !== value) {
          changed = true;
        }
      }
      validated = validated && data[key].validated.all;
    }
    return changed && validated;
  };

  return {primaryData, save, cancel, changed};
};
