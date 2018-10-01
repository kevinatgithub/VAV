import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from '@blueprintjs/core';
import { Flex } from '../../ui';
import theme from '../../../theme';

const PageContent = ({ children, title }) =>
  <Flex
    fdc paddingLeft={25} paddingRight={25} paddingTop={15} paddingBottom={15}
    marginLeft={theme.metrics.sidebar}
  >
    <Flex paddingBottom={2}>
      <H2>{title}</H2>
    </Flex>
    <Flex>
      {children}
    </Flex>
  </Flex>;

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default PageContent;
