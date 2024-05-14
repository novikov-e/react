import {useLayoutEffect, useRef, useState} from 'react';

function StatePanel({title, items, itemMinWidth, itemMinHeight, timeout, itemKey, onItemClick, openObject, width}) {
  console.log('StatePanel');

  const myRef = useRef();
  let pageInterval = null;

  const [pagesCount, setPagesCount] = useState(0);
  const [pageItemsCount, setPageItemsCount] = useState(0);
  const [colCount, setColCount] = useState(5);
  const [rowCount, setRowCount] = useState(7);
  const [fontSize, setFontSize] = useState(13);

  const [currentPage, setCurrentPage] = useState(0);
  const [changePage, setChangePage] = useState(new Date());
  const [playState, setPlayState] = useState('play');

  useLayoutEffect(() => {
    calculate();
  }, [items]);

  const calculate = () => {
    //Максимальное количество столбцов
    const {clientHeight, clientWidth} = myRef.current;
    let maxColCount = Math.floor(clientWidth / itemMinWidth);
    //Максимальное количество строк
    const maxRowCount = Math.floor(clientHeight / itemMinHeight);
    //Максимальное количество ячеек на странице
    const maxPageItemsCount = maxColCount * maxRowCount;
    //Количество страниц
    const pagesCount = Math.ceil(items.length / maxPageItemsCount);
    //Количество ячеек на странице после распределения(от него происходит расчёт)
    let pageItemsCount;
    if (pagesCount <= 1) {
      pageItemsCount = items.length;
    } else {
      pageItemsCount = Math.ceil(items.length / pagesCount);
    }
    let assumedPageItemsCount = pageItemsCount;
    let complete = false;
    let colCount;
    let rowCount;
    //В большую сторону
    while (true) {
      //Если количество на странице после распределения больше максимального кол-ва на странице - считать в меньшую сторону
      //Предполагаемое количество ячеек на странице
      if (assumedPageItemsCount > maxPageItemsCount) {
        break;
      }
      //Поиск делителей для данного количества
      let divisors = searchForDivisors(assumedPageItemsCount);
      if (divisors !== null) {
        colCount = divisors.colCount;
        rowCount = divisors.rowCount;
        pageItemsCount = assumedPageItemsCount;
        complete = true;
        break;
      }
      assumedPageItemsCount++;
    }
    if (!complete) {
      colCount = maxColCount;
      rowCount = Math.ceil(pageItemsCount / maxColCount);
      pageItemsCount = colCount * rowCount;
    }
    //Подсчёт размера шрифта
    let width = Math.floor(clientWidth / colCount);
    let fontSize = Math.ceil(clientHeight / rowCount - 10);
    if (fontSize * 4 * 0.55 > width - 10) {
      fontSize = Math.ceil((width - 10) / 4 / 0.55);
    }
    setColCount(colCount);
    setRowCount(rowCount);
    setPageItemsCount(pageItemsCount);
    setFontSize(fontSize);
    setPagesCount(pagesCount);
  };

  //Количество ячеек на странице
  const searchForDivisors = dec => {
    if (dec % 2 !== 0) {
      return null;
    }
    const {clientHeight, clientWidth} = myRef.current;
    let windowProportion = 1;
    //Если ширина больше длины то большее количество - количество столбцов
    if (clientWidth > clientHeight) {
      windowProportion = clientWidth / clientHeight;
      //Если длина больше ширины то большее количество - количество строк
    } else if (clientWidth < clientHeight) {
      windowProportion = clientHeight / clientWidth;
    }
    let divisors = [];
    for (let i = 2; i < dec; i++) {
      if (dec % i === 0) {
        let j = dec / i;
        //пропорция количества
        let proportion = i / j;
        if (proportion >= 1 && proportion <= 1.6) {
          //Определение столбцов и строк
          //Большей длине соответствует большее количество
          const {colCount, rowCount} =
            clientWidth >= clientHeight
              ? i >= j
                ? {colCount: i, rowCount: j}
                : {colCount: j, rowCount: i}
              : i >= j
                ? {colCount: j, rowCount: i}
                : {colCount: i, rowCount: j};
          //Проверка
          // сумма ширин столбцов не больше размера окна
          // сумма высот строк не больше высоты окна
          if (colCount * itemMinWidth <= clientWidth && rowCount * itemMinHeight <= clientHeight) {
            divisors.push({colCount, rowCount, proportion});
          }
        }
      }
    }
    if (divisors.length !== 0) {
      if (divisors.length > 1) {
        let divisor = divisors[0];
        for (let i = 1; i < divisors.length; i++) {
          if (Math.abs(windowProportion - divisors[i].proportion) < Math.abs(windowProportion - divisor.proportion)) {
            divisor = divisors[i];
          }
        }
        return divisor;
      }
      return divisors[0];
    }
    return null;
  };

  const nextPage = () => {
    if (playState === 'play') {
      if (new Date() - changePage.getTime() > timeout) {
        let newCurrentPage;
        if (currentPage === pagesCount - 1) {
          newCurrentPage = 0;
        } else {
          newCurrentPage = currentPage + 1;
        }
        setChangePage(new Date());
        setCurrentPage(newCurrentPage);
      }
    }
  };

  const play = () => {
    pageInterval = setInterval(nextPage, 1000);
    setPlayState('play');
  };

  //Больше трёх страниц не работает
  const pause = () => {
    clearInterval(pageInterval);
    pageInterval = null;
    setPlayState('pause');
  };

  const itemClassName = object => {
    let className = 'flex-row center align-items-center border border-box ';
    switch (object.general_flag_object) {
      case 0:
        switch (object.status_object) {
          case 0: //0 - снят
            return className + 'aqua';
          case 1: //1 - взят
            return className + 'pink';
          case 2: //2 - частично снят
            return className + 'green';
        }
        break;
      case 1: //Пожар
        return className + 'orange';
      case 2:
      case 3: //Нападение Тревога
        return className + 'red';
      case 4: //Предупреждение
        return className + 'orange';
      case 5: //Неисправность
        return className + 'blue';
      default:
        return className + 'aqua';
    }
  };

  const renderItems = () => {
    let start = pageItemsCount * currentPage;
    let end = pageItemsCount * (currentPage + 1);
    if (end > items.length) {
      end = items.length;
    }
    let newItems = [];
    for (let i = start; i < end; i++) {
      newItems.push(
        <div className={itemClassName(items[i])} onClick={() => openObject(items[i][itemKey])}>
          <div className="user-select-none" style={{fontSize: fontSize + 'px'}}>
            {items[i][itemKey]}
          </div>
        </div>,
      );
    }
    return newItems;
  };

  const pagesButtons = () => {
    let buttons = [];
    for (let i = 0; i < pagesCount; i++) {
      buttons.push(
        <div className="btn-group" role="group">
          <button
            className={
              currentPage === i
                ? 'btn btn-sm btn-primary height-30px width-30-px radius-0'
                : 'btn btn-sm btn-default height-30px width-30-px radius-0'
            }
            onClick={() => setCurrentPage(i)}
          >
            {i + 1}
          </button>
        </div>,
      );
    }
    return buttons;
  };

  return (
    <div className="height-100 width-100 flex-column window-body-background-color window-body-text-color">
      <div
        className="height-30-px flex-row space-between align-items-center border-bottom window-header-background-color window-header-text-color"
        // style={{width: "1000px"}}
      >
        <div className="ml-10 font-weight-bold">{title}</div>
        <div className="flex-row g-10">
          <div className="btn-group">
            {pagesCount > 1 && playState === 'play' && (
              <div className="btn-group" role="group">
                <button className="btn btn-sm btn-danger btn-sm height-30-px width-30-px radius-0" onClick={pause}>
                  <i className="fa-solid fa-pause"></i>
                </button>
              </div>
            )}
            {pagesCount > 1 && playState === 'pause' && (
              <div className="btn-group" role="group">
                <button className="btn btn-sm btn-success btn-sm height-30-px width-30-px radius-0" onClick={play}>
                  <i className="fa-solid fa-play"></i>
                </button>
              </div>
            )}
            {pagesCount > 1 && pagesButtons()}
          </div>
        </div>
      </div>

      <div ref={myRef} className="width-100" style={{height: 'calc(100% - 30px)'}}>
        <div
          className="height-100 width-100"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${colCount},  minmax(${itemMinWidth}px, 1fr))`,
            gridTemplateRows: `repeat(${rowCount}, minmax(${itemMinHeight}px, 1fr))`,
          }}
        >
          {renderItems()}
        </div>
      </div>
    </div>
  );
}

export default StatePanel;
