import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  //Дропдаун который автоматически открывается в нужную сторону

  render() {
    return (
      <div className="dropdown">
        <button className="button" onClick={() => this.setState({open: !this.state.open})}>
          Dropdown
        </button>
        {this.state.open ? (
          // <ul className="menu">
          //     <li className="menu-item">
          //         <button>Menu 1</button>
          //     </li>
          //     <li className="menu-item">
          //         <button>Menu 2</button>
          //     </li>
          // </ul>
          <div className="menu">
            <div>Закрыть вкладку?</div>
            <div>
              <button>Отмена</button>
              <button>Закрыть</button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
