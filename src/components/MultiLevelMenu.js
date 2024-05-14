import React, {Component} from 'react';

class MultiLevelMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: true,
      first: false,
      second: false,
      third: false,
      fourth: false,
      fifth: false,
      sixth: false,
    };
  }

  render() {
    return (
      <div style={{position: 'relative'}}>
        <div
          className={'resize-container'}
          style={{visibility: this.state.menu ? 'visible' : 'hidden', position: 'absolute'}}
        >
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: false, first: true})}>Вкладка 1</button>
          </div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: false, second: true})}>Вкладка 2</button>
          </div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: false, third: true})}>Вкладка 3</button>
          </div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: false, fourth: true})}>Вкладка 4</button>
          </div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: false, fifth: true})}>Вкладка 5</button>
          </div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: false, sixth: true})}>Вкладка 6</button>
          </div>
        </div>

        <div
          className={'resize-container'}
          style={{visibility: this.state.first ? 'visible' : 'hidden', position: 'absolute'}}
        >
          <div>Вкладка 1</div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: true, first: false})}>Назад</button>
          </div>
        </div>

        <div
          className={'resize-container'}
          style={{visibility: this.state.second ? 'visible' : 'hidden', position: 'absolute'}}
        >
          <div>Вкладка 2</div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: true, second: false})}>Назад</button>
          </div>
        </div>

        <div
          className={'resize-container'}
          style={{visibility: this.state.third ? 'visible' : 'hidden', position: 'absolute'}}
        >
          <div>Вкладка 3</div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: true, third: false})}>Назад</button>
          </div>
        </div>

        <div
          className={'resize-container'}
          style={{visibility: this.state.fourth ? 'visible' : 'hidden', position: 'absolute'}}
        >
          <div>Вкладка 4</div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: true, fourth: false})}>Назад</button>
          </div>
        </div>

        <div
          className={'resize-container'}
          style={{visibility: this.state.fifth ? 'visible' : 'hidden', position: 'absolute'}}
        >
          <div>Вкладка 5</div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: true, fifth: false})}>Назад</button>
          </div>
        </div>

        <div
          className={'resize-container'}
          style={{visibility: this.state.sixth ? 'visible' : 'hidden', position: 'absolute'}}
        >
          <div>Вкладка 6</div>
          <div className={'resize-container-item'}>
            <button onClick={() => this.setState({menu: true, sixth: false})}>Назад</button>
          </div>
        </div>
      </div>
    );
  }
}

MultiLevelMenu.propTypes = {};

export default MultiLevelMenu;
