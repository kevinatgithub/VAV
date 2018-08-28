import React from 'react';
import PropTypes from 'prop-types';
import loadingBarStyle from './loading-bar-style';

const { Progress, Indeterminate } = loadingBarStyle;

const LoadingBar = ({ visible }) =>
  !!visible &&
    <Progress>
      <Indeterminate />
    </Progress>;

LoadingBar.propTypes = {
  visible: PropTypes.bool,
};

export default LoadingBar;
