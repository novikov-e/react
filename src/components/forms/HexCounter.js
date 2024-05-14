import React from 'react';
import PropTypes from 'prop-types';

class HexCounter extends React.Component {
  static propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      decValue: 0,
      hexValue: '0x0',
      inputFocus: false,
    };
  }

  increase = () => {
    if (this.state.decValue < this.props.maxValue) {
      let decValue = this.state.decValue + 1;
      let hexValue = '0x' + decValue.toString(16);
      this.setState({decValue, hexValue});
    }
  };

  decrease = () => {
    if (this.state.decValue > this.props.minValue) {
      let decValue = this.state.decValue - 1;
      let hexValue = '0x' + decValue.toString(16);
      this.setState({decValue, hexValue});
    }
  };

  handleChange = event => {
    let hexValue = event.target.value.toLowerCase();
    if (hexValue[0] === '0' && hexValue[1] === 'x') {
      let decValue = Number(hexValue);
      if (decValue > this.props.minValue && decValue < this.props.maxValue) this.setState({decValue, hexValue});
    }
  };

  render() {
    return (
      <div
        className={this.state.inputFocus ? 'custom-counter custom-counter-active' : 'custom-counter'}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          className="custom-counter-input"
          onFocus={() => this.setState({inputFocus: true})}
          onBlur={() => this.setState({inputFocus: false})}
          onChange={this.handleChange}
          value={this.state.hexValue}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginRight: '-4px',
          }}
        >
          <button
            className="custom-counter-icon-btn"
            onClick={this.increase}
            onFocus={() => this.setState({inputFocus: true})}
            onBlur={() => this.setState({inputFocus: false})}
          >
            <i className="fa-solid fa-caret-up"></i>
          </button>
          <button
            className="custom-counter-icon-btn"
            onClick={this.decrease}
            onFocus={() => this.setState({inputFocus: true})}
            onBlur={() => this.setState({inputFocus: false})}
          >
            <i className="fa-solid fa-caret-down"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default HexCounter;
