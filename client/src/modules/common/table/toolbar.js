import React from 'react';
import PropTypes from 'prop-types';

class Toolbar extends React.Component {
  state = {};

  render() {
    return this.props.children;
  }
}

Toolbar.propTypes = {
  children: PropTypes.node,
};

export default Toolbar;
