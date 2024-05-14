import React, {Component} from 'react';

class ResizableDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resize: false,
      resizeLeft: false,
      resizeRight: false,
      startResizeX: undefined,
      startResizeY: undefined,
      leftFirstDivMinHeight: 100,
      leftFirstDivHeight: 249,
      leftSecondDivMinHeight: 100,
      leftSecondDivHeight: 248,
      rightFirstDivMinHeight: 100,
      rightFirstDivHeight: 249,
      rightSecondDivMinHeight: 100,
      rightSecondDivHeight: 248,
      leftDivMinWidth: 100,
      leftDivWidth: 249,
      rightDivMinWidth: 100,
      rightDivWidth: 248,
    };
  }

  startResizeYLeft = event => {
    this.setState({resizeLeft: true, startResizeY: event.clientY});
  };

  startResizeYRight = event => {
    this.setState({resizeRight: true, startResizeY: event.clientY});
  };

  startResizeX = event => {
    this.setState({resize: true, startResizeX: event.clientX});
  };

  stopResize = () => {
    this.setState({resize: false, resizeLeft: false, resizeRight: false});
  };

  // Залипает при движении вверх и при движении вниз(dev server)
  //Всегда получает координаты мыши и в зависимости от элемента должен выполнять расчёты и изменение размеров
  moveX = event => {
    if (this.state.resizeLeft) {
      const y = event.clientY;
      if (y < this.state.startResizeY) {
        //Вверх
        let delta = this.state.startResizeY - y;
        let maxDelta = this.state.leftFirstDivHeight - this.state.leftFirstDivMinHeight;
        //Изменение координат меньше чем высота минус минимальная высота
        if (delta <= maxDelta) {
          this.setState({
            startResizeY: this.state.startResizeY - delta,
            leftFirstDivHeight: this.state.leftFirstDivHeight - delta,
            leftSecondDivHeight: this.state.leftSecondDivHeight + delta,
          });
        }
      }
      if (y > this.state.startResizeY) {
        //Вниз
        let delta = y - this.state.startResizeY;
        let maxDelta = this.state.leftSecondDivHeight - this.state.leftSecondDivMinHeight;
        //Изменение координат меньше чем высота минус минимальная высота
        if (delta <= maxDelta) {
          this.setState({
            startResizeY: this.state.startResizeY + delta,
            leftFirstDivHeight: this.state.leftFirstDivHeight + delta,
            leftSecondDivHeight: this.state.leftSecondDivHeight - delta,
          });
        }
      }
    }
    if (this.state.resizeRight) {
      const y = event.clientY;
      if (y < this.state.startResizeY) {
        //Вверх
        let delta = this.state.startResizeY - y;
        let maxDelta = this.state.rightFirstDivHeight - this.state.rightFirstDivMinHeight;
        //Изменение координат меньше чем высота минус минимальная высота
        if (delta <= maxDelta) {
          this.setState({
            startResizeY: this.state.startResizeY - delta,
            rightFirstDivHeight: this.state.rightFirstDivHeight - delta,
            rightSecondDivHeight: this.state.rightSecondDivHeight + delta,
          });
        }
      }
      if (y > this.state.startResizeY) {
        //Вниз
        let delta = y - this.state.startResizeY;
        let maxDelta = this.state.rightSecondDivHeight - this.state.rightSecondDivMinHeight;
        //Изменение координат меньше чем высота минус минимальная высота
        if (delta <= maxDelta) {
          this.setState({
            startResizeY: this.state.startResizeY + delta,
            rightFirstDivHeight: this.state.rightFirstDivHeight + delta,
            rightSecondDivHeight: this.state.rightSecondDivHeight - delta,
          });
        }
      }
    }
    if (this.state.resize) {
      const x = event.clientX;
      if (x < this.state.startResizeX) {
        //Влево
        let delta = this.state.startResizeX - x;
        let maxDelta = this.state.leftDivWidth - this.state.leftDivMinWidth;
        //Изменение координат меньше чем высота минус минимальная высота
        if (delta <= maxDelta) {
          this.setState({
            startResizeX: this.state.startResizeX - delta,
            leftDivWidth: this.state.leftDivWidth - delta,
            rightDivWidth: this.state.rightDivWidth + delta,
          });
        }
      }
      if (x > this.state.startResizeX) {
        //Вправо
        let delta = x - this.state.startResizeX;
        let maxDelta = this.state.rightDivWidth - this.state.rightDivMinWidth;
        //Изменение координат меньше чем высота минус минимальная высота
        if (delta <= maxDelta) {
          this.setState({
            startResizeX: this.state.startResizeX + delta,
            leftDivWidth: this.state.leftDivWidth + delta,
            rightDivWidth: this.state.rightDivWidth - delta,
          });
        }
      }
    }
  };

  render() {
    return (
      <div style={{display: 'flex', height: '500px'}} onMouseMove={this.moveX} onMouseUp={this.stopResize}>
        <div style={{display: 'flex', flexDirection: 'column', width: this.state.leftDivWidth, height: '100%'}}>
          <div style={{height: this.state.leftFirstDivHeight, backgroundColor: 'red'}}></div>
          <div
            style={{height: '3px', backgroundColor: 'gray', cursor: 'row-resize'}}
            onMouseDown={this.startResizeYLeft}
          ></div>
          <div style={{height: this.state.leftSecondDivHeight, backgroundColor: 'blue'}}></div>
        </div>

        <div
          style={{width: '3px', height: '100%', backgroundColor: 'gray', cursor: 'col-resize'}}
          onMouseDown={this.startResizeX}
        ></div>

        <div style={{display: 'flex', flexDirection: 'column', width: this.state.rightDivWidth, height: '100%'}}>
          <div style={{height: this.state.rightFirstDivHeight, backgroundColor: 'green'}}></div>
          <div
            style={{height: '3px', backgroundColor: 'gray', cursor: 'row-resize'}}
            onMouseDown={this.startResizeYRight}
          ></div>
          <div style={{height: this.state.rightSecondDivHeight, backgroundColor: 'yellow'}}></div>
        </div>
      </div>
    );
  }
}

export default ResizableDiv;
