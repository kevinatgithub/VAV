import React from 'react';
import PropTypes from 'prop-types';
import { H2 } from '@blueprintjs/core';
import { Flex } from 'core/styled';
import theme from 'core/theme';

const PageContent = ({ children, title, paddingless }) =>
  <Flex
    fdc
    flex={1}
    overflowY={'auto'}
    paddingLeft={paddingless ? 0 : theme.metrics.pageContentPaddingHorizontal}
    paddingRight={paddingless ? 0 : theme.metrics.pageContentPaddingHorizontal}
    paddingTop={paddingless ? 0 : theme.metrics.pageContentPaddingVertical}
    paddingBottom={paddingless ? 0 : theme.metrics.pageContentPaddingVertical}
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
  paddingless: PropTypes.bool,
};

export default PageContent;
