// import PropTypes from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '../../ui';

import { Wrapper } from './page-header-style';

const PageHeader = ({ title, desc, actionButtons }) => {
  return (
    <Wrapper>
      <Flex fdc>
        <Flex>
          {title}
        </Flex>
        <Flex fdr marginBottom={10} marginTop={desc ? 15 : 0}>
          {desc}
          <Flex flex={1} />
          {actionButtons}
        </Flex>
      </Flex>
    </Wrapper>
  );
};

PageHeader.propTypes = {
  title: PropTypes.node,
  desc: PropTypes.node,
  actionButtons: PropTypes.node,
};

export default PageHeader;
