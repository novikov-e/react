import React, {useEffect, useState} from 'react';
// import {getRequest, postRequest} from "../utils/requests";
// import {SERVER_URL} from "../api/url";

export function DarkModeButton(props) {
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => getRequest(SERVER_URL + "/api/dark_mode/", settings => {
  //     setDarkMode(settings.darkMode)
  //     if (settings.darkMode) {
  //         changeTheme();
  //     }
  // }), []);

  const changeMode = () => {
    // postRequest(SERVER_URL + "/api/dark_mode/", {darkMode: !darkMode}, () => {
    setDarkMode(!darkMode);
    changeTheme();
    // })
  };

  const changeTheme = () => {
    if (!document.body.getAttribute('dark-mode')) {
      document.body.setAttribute('dark-mode', 'dark');
    } else {
      document.body.removeAttribute('dark-mode');
    }
  };

  return (
    <button onClick={changeMode} className="button-with-text-icon-without-border height-100">
      {darkMode ? (
        <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 15q1.25 0 2.125-.875T15 12q0-1.25-.875-2.125T12 9q-1.25 0-2.125.875T9 12q0 1.25.875 2.125T12 15Zm0 2q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm18 0q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8-8q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm0 18q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05 4.575 6q-.3-.275-.288-.7.013-.425.288-.725.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7 0 .4-.275.7-.275.3-.687.287-.413-.012-.713-.287ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712 0-.413.275-.688.275-.3.688-.287.412.012.712.287L19.425 18q.3.275.288.7-.013.425-.288.725-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.287-.688.012-.412.287-.712L18 4.575q.275-.3.7-.288.425.013.725.288.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275-.4 0-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.713-.275.412 0 .687.275.3.275.288.688-.013.412-.288.712L6 19.425q-.275.3-.7.287-.425-.012-.725-.287ZM12 12Z" />
        </svg>
      ) : (
        <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 21q-3.775 0-6.388-2.613Q3 15.775 3 12q0-3.45 2.25-5.988Q7.5 3.475 11 3.05q.625-.075.975.45t-.025 1.1q-.425.65-.638 1.375Q11.1 6.7 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q.775 0 1.538-.225.762-.225 1.362-.625.525-.35 1.075-.038.55.313.475.988-.35 3.45-2.937 5.725Q15.425 21 12 21Zm0-2q2.2 0 3.95-1.212 1.75-1.213 2.55-3.163-.5.125-1 .2-.5.075-1 .075-3.075 0-5.238-2.162Q9.1 10.575 9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.162 2.55Q5 9.8 5 12q0 2.9 2.05 4.95Q9.1 19 12 19Zm-.25-6.75Z" />
        </svg>
      )}
    </button>
  );
}
