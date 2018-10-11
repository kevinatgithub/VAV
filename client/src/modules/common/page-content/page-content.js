import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from '@blueprintjs/core';
import { Flex } from '../../ui';
import theme from '../../../theme';

const PageContent = ({ children, title, paddingLess }) =>
  <Flex
    fdc
    flex={1}
    overflowY={'auto'}
    paddingLeft={paddingLess ? 0 : 25}
    paddingRight={paddingLess ? 0 : 25}
    paddingTop={paddingLess ? 0 : 15}
    paddingBottom={paddingLess ? 0 : 15}
    marginLeft={theme.metrics.sidebar}
  >
    <Flex paddingBottom={2}>
      {title && <H2>{title}</H2>}
    </Flex>
    <Flex flex={1}>{children}</Flex>
  </Flex>;

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  paddingLess: PropTypes.bool,
};

export default PageContent;
