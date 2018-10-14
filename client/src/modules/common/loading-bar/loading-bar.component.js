import React from 'react';
import PropTypes from 'prop-types';
import loadingBarStyle from './loading-bar.style';

const { Progress, Indeterminate } = loadingBarStyle;

const LoadingBar = ({ visible, top }) =>
  !!visible &&
    <Progress top={top}>
      <Indeterminate />
    </Progress>;

LoadingBar.propTypes = {
  visible: PropTypes.bool,
  top: PropTypes.number,
};

export default LoadingBar;
