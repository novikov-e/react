import React from 'react';
import Canvas from './Canvas';

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {angle: 0};
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState = () => {
    this.setState(prevState => ({angle: prevState.angle + 60}));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return <Canvas angle={this.state.angle} />;
  }
}

export default Animation;
