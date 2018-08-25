import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Div } from '../../ui';

class LoginComponent extends Component {
  state = {};

  render() {
    const { composedComponent: ComposedComponent } = this.props;

    return (
      <Div>
        <ComposedComponent />
      </Div>
    );
  }
}
LoginComponent.propTypes = {
  composedComponent: PropTypes.func.isRequired,
};

export default LoginComponent;
