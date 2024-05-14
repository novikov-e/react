import {Component} from 'react';

class Notifications extends Component {
  render() {
    return (
      <div
        className="position-absolute window-body-background-color window-body-text-color"
        style={{
          height: this.props.height,
          width: this.props.width,
          zIndex: 1,
        }}
      >
        <div className="flex-column overflow-y-auto" style={{height: this.props.height}}></div>
      </div>
    );
  }
}

export default Notifications;
