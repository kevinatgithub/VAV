import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from '@blueprintjs/core';
import { Flex } from 'core/styled';
import theme from 'core/theme';

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
    {title &&
      <Flex paddingBottom={2}>
        <H2>{title}</H2>
      </Flex>
    }
    <Flex flex={1}>{children}</Flex>
  </Flex>;
PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  paddingLess: PropTypes.bool,
};

export default PageContent;
