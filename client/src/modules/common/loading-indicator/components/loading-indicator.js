// import PropTypes from 'prop-types';
import React from 'react';
import { Div, Flex, CenterBody } from 'core/styled';
import loadingStyle from './loading-indicator-style';

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
