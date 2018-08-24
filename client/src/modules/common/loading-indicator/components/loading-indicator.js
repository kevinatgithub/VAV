// import PropTypes from 'prop-types';
import React from 'react';
import loadingStyle from './loading-indicator-style';
import { Div, Flex, CenterBody } from '../../../ui';

const { Wrapper } = loadingStyle;

const LoadingIndicator = () =>
  <CenterBody>
    <Flex fdr jcc>
      <Wrapper>
        <Div />
        <Div />
        <Div />
      </Wrapper>
    </Flex>
  </CenterBody>;

export default LoadingIndicator;
