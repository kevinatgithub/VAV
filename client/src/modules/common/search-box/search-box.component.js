import React, { Component } from 'react';
import styled from 'styled-components';
import { InputGroup, Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';

const StyledInputGroup = styled(InputGroup)`
  > .bp3-input-action,
  &.bp3-input-group .bp3-input-action:last-child {
    cursor: pointer;
    color: #5c7080;
    top: 8px;
    right: 5px;
  }
`;

class SearchBox extends Component {
  state = { value: '' };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleIconClick = () => {
    this.setState({ value: '' });
    if (this.props.onClear) {
      this.props.onClear();
    }
  };

  render() {
    const { onClear, ...rest } = this.props; // eslint-disable-line
    const textVisibility = this.state.value ? 'visible' : 'hidden';

    return (
      <StyledInputGroup
        {...rest}
        value={this.state.value}
        onChange={this.handleChange}
        rightElement={<Icon iconSize={16} icon='small-cross' visibility={textVisibility} onClick={this.handleIconClick} />}
      />
    );
  }
}

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  onKeyPress: PropTypes.func,
  onClear: PropTypes.func,
};

export default SearchBox;
