import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Home from './Home';
import Buttons from './Buttons';
import Lists from './Lists';
import Tables from './Tables';
import Settings from './Settings';
import Forms from './Forms';
import {DarkModeButton} from '../components/buttons/DarkModeButton';
import Animations from './Animations';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import Configurator from './Configurator';
import HomeIcon from '../svg/icons/HomeIcon';

export default function Root(props) {
  return (
    <Router>
      <div className="page">
        <div className="header">
          <div className="flex-row height-100">
            <div className="logo"></div>
            <Link
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 10px',
                gap: '10px',
                textDecoration: 'none',
                backgroundColor: 'transparent',
                height: '100%',
                color: 'var(--tab-text-color)',
                fontSize: '15px',
                fontWeight: 600,
              }}
              to="/"
            >
              <HomeIcon />
              Главная
            </Link>
            <Link className="router-link" to="/">
              <button className="button-with-text-icon-without-border height-100">
                <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10Zm0 2q-.825 0-1.412-.587Q4 19.825 4 19v-9q0-.475.213-.9.212-.425.587-.7l6-4.5q.275-.2.575-.3.3-.1.625-.1t.625.1q.3.1.575.3l6 4.5q.375.275.588.7.212.425.212.9v9q0 .825-.587 1.413Q18.825 21 18 21h-5v-6h-2v6Zm6-8.75Z" />
                </svg>
                Главная
              </button>
            </Link>
            <Link className="router-link" to="/configurator">
              <button className="button-with-text-icon-without-border height-100">
                <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.612-.3-.288-.175-.563-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7.075-.375.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L2.65 9.9q-.3-.225-.375-.6-.075-.375.125-.7l1.85-3.225q.175-.35.537-.438.363-.087.713.038l2.175.9q.275-.2.575-.375.3-.175.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3.287.175.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7-.075.375-.375.6l-1.875 1.425q.025.175.025.337v.675q0 .163-.05.338l1.875 1.425q.3.225.375.6.075.375-.125.7l-1.85 3.2q-.2.325-.562.438-.363.112-.713-.013l-2.125-.9q-.275.2-.575.375-.3.175-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Zm0-2q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588.662-.387 1.212-.937l2.475 1.025.975-1.7-2.15-1.625q.125-.35.175-.738.05-.387.05-.787t-.05-.788q-.05-.387-.175-.737l2.15-1.625-.975-1.7-2.475 1.05q-.55-.575-1.212-.963-.663-.387-1.438-.587L13 4h-1.975l-.35 2.65q-.775.2-1.437.587-.663.388-1.213.938L5.55 7.15l-.975 1.7 2.15 1.6q-.125.375-.175.75-.05.375-.05.8 0 .4.05.775t.175.75l-2.15 1.625.975 1.7 2.475-1.05q.55.575 1.213.962.662.388 1.437.588Z" />
                </svg>
                Конфигуратор
              </button>
            </Link>
            <Link className="router-link" to="/forms">
              <button className="button-with-text-icon-without-border height-100">
                <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M10.8 15.775q-.3-.3-.288-.713.013-.412.313-.712l1.35-1.35H3q-.425 0-.712-.288Q2 12.425 2 12t.288-.713Q2.575 11 3 11h9.175L10.8 9.65q-.3-.275-.3-.7 0-.425.3-.725t.713-.3q.412 0 .712.3L15.3 11.3q.15.15.213.325.062.175.062.375t-.062.375q-.063.175-.213.325l-3.1 3.1q-.275.275-.687.275-.413 0-.713-.3ZM4 20q-.825 0-1.412-.587Q2 18.825 2 18v-2q0-.425.288-.713Q2.575 15 3 15t.713.287Q4 15.575 4 16v2h16V6H4v2q0 .425-.287.712Q3.425 9 3 9t-.712-.288Q2 8.425 2 8V6q0-.825.588-1.412Q3.175 4 4 4h16q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413Q20.825 20 20 20Z" />
                </svg>
                Формы
              </button>
            </Link>
            <Link className="router-link" to="/buttons">
              <button className="button-with-text-icon-without-border height-100">
                <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M4 17q-.825 0-1.412-.587Q2 15.825 2 15V9q0-.825.588-1.413Q3.175 7 4 7h16q.825 0 1.413.587Q22 8.175 22 9v6q0 .825-.587 1.413Q20.825 17 20 17h-1v-2h1V9H4v6h6v2Zm10.075 1.1-.675-1.5-1.5-.675q-.325-.15-.325-.425t.325-.425l1.5-.675.675-1.5q.15-.325.425-.325t.425.325l.675 1.5 1.5.675q.3.125.3.425t-.3.425l-1.5.675-.675 1.5q-.125.3-.425.3t-.425-.3Zm2.625-4.775-.325-.7-.7-.325q-.275-.125-.275-.3t.275-.3l.7-.325.325-.7q.125-.275.3-.275t.3.275l.325.7.7.325q.275.125.275.3t-.275.3l-.7.325-.325.7q-.125.275-.3.275t-.3-.275Z" />
                </svg>
                Кнопки
              </button>
            </Link>
            <Link className="router-link" to="/lists">
              <button className="button-with-text-icon-without-border height-100">
                <svg
                  className="svg-icon svg-icon-24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
                </svg>
                Drag And Drop
              </button>
            </Link>
            <Link className="router-link" to="/tables">
              <button className="button-with-text-icon-without-border height-100">
                <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M3 21V3h18v18ZM5 9h14V5H5Zm5.325 5h3.35v-3h-3.35Zm0 5h3.35v-3h-3.35ZM5 14h3.325v-3H5Zm10.675 0H19v-3h-3.325ZM5 19h3.325v-3H5Zm10.675 0H19v-3h-3.325Z" />
                </svg>
                Таблицы
              </button>
            </Link>
            <Link className="router-link" to="/animations">
              <button className="button-with-text-icon-without-border height-100">
                <svg
                  className="svg-icon svg-icon-24"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M360-80q-58 0-109-22t-89-60q-38-38-60-89T80-360q0-81 42-148t110-102q20-39 49.5-68.5T350-728q33-68 101-110t149-42q58 0 109 22t89 60q38 38 60 89t22 109q0 85-42 150T728-350q-20 39-49.5 68.5T610-232q-35 68-102 110T360-80Zm0-80q33 0 63.5-10t56.5-30q-58 0-109-22t-89-60q-38-38-60-89t-22-109q-20 26-30 56.5T160-360q0 42 16 78t43 63q27 27 63 43t78 16Zm120-120q33 0 64.5-10t57.5-30q-59 0-110-22.5T403-403q-38-38-60.5-89T320-602q-20 26-30 57.5T280-480q0 42 15.5 78t43.5 63q27 28 63 43.5t78 15.5Zm120-120q18 0 34.5-3t33.5-9q22-60 6.5-115.5T621-621q-38-38-93.5-53.5T412-668q-6 17-9 33.5t-3 34.5q0 42 15.5 78t43.5 63q27 28 63 43.5t78 15.5Zm160-78q20-26 30-57.5t10-64.5q0-42-15.5-78T741-741q-27-28-63-43.5T600-800q-35 0-65.5 10T478-760q59 0 110 22.5t89 60.5q38 38 60.5 89T760-478Z" />
                </svg>
                Анимации
              </button>
            </Link>
            {/*<Link className="router-link" to="/settings">*/}
            {/*    <button className="button-with-text-icon-without-border height-100">*/}
            {/*        <svg className="svg-icon svg-icon-24" xmlns="http://www.w3.org/2000/svg"*/}
            {/*             viewBox="0 0 24 24">*/}
            {/*            <path*/}
            {/*                d="M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.612-.3-.288-.175-.563-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7.075-.375.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337L2.65 9.9q-.3-.225-.375-.6-.075-.375.125-.7l1.85-3.225q.175-.35.537-.438.363-.087.713.038l2.175.9q.275-.2.575-.375.3-.175.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3.287.175.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7-.075.375-.375.6l-1.875 1.425q.025.175.025.337v.675q0 .163-.05.338l1.875 1.425q.3.225.375.6.075.375-.125.7l-1.85 3.2q-.2.325-.562.438-.363.112-.713-.013l-2.125-.9q-.275.2-.575.375-.3.175-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025Q15.55 13.45 15.55 12q0-1.45-1.025-2.475Q13.5 8.5 12.05 8.5q-1.475 0-2.488 1.025Q8.55 10.55 8.55 12q0 1.45 1.012 2.475Q10.575 15.5 12.05 15.5Zm0-2q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588.662-.387 1.212-.937l2.475 1.025.975-1.7-2.15-1.625q.125-.35.175-.738.05-.387.05-.787t-.05-.788q-.05-.387-.175-.737l2.15-1.625-.975-1.7-2.475 1.05q-.55-.575-1.212-.963-.663-.387-1.438-.587L13 4h-1.975l-.35 2.65q-.775.2-1.437.587-.663.388-1.213.938L5.55 7.15l-.975 1.7 2.15 1.6q-.125.375-.175.75-.05.375-.05.8 0 .4.05.775t.175.75l-2.15 1.625.975 1.7 2.475-1.05q.55.575 1.213.962.662.388 1.437.588Z"/>*/}
            {/*        </svg>*/}
            {/*        Настройки*/}
            {/*    </button>*/}
            {/*</Link>*/}
          </div>
          <div className="flex-row height-100">
            <DarkModeButton />
          </div>
        </div>
        <Switch>
          <div className="height-100 window-body-background-color">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/forms">
              <Forms />
            </Route>
            <Route path="/buttons">
              <Buttons />
            </Route>
            <Route path="/lists">
              <DndProvider backend={HTML5Backend}>
                <Lists configuration={props.configuration} />
              </DndProvider>
            </Route>
            <Route path="/tables">
              <Tables />
            </Route>
            <Route path="/animations">
              <Animations />
            </Route>
            {/*<Route path="/settings"><Settings/></Route>*/}
            <Route path="/configurator">
              <Configurator />
            </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}
