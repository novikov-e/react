import React from 'react';

class Canvas extends React.Component {
  render() {
    return (
      <div className="atom">
        <div className="custom" />
        <div className="neutrons">
          <div className="first-neutron" />
          <div className="second-neutron" />
        </div>
        <div className="electrons">
          <div className="first-electron" />
          <div className="second-electron" />
        </div>
      </div>
    );
  }
}

export default Canvas;
