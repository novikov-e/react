import React from 'react';

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  onClick = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick}>click</button>
        <div className={this.state.open ? 'foldable opened' : 'foldable closed'}>
          <div>Sidenav</div>
        </div>
      </div>
    );
  }
}

export default SideNav;
