import React from 'react';
import PropTypes from 'prop-types';
import DynamicNavigation from '../components/DynamicNavigation';

class Settings extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DynamicNavigation />
      </div>
    );
  }
}

export default Settings;
