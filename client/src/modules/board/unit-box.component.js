import React from 'react';
import PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import { Flex, Span } from 'core/styled';
import { Wrapper, UnitTitle } from './unit-box.style';
import UnitStatus from './unit-status.component';

function UnitBox({ status }) {
  return (
    <Wrapper className={Classes.ELEVATION_1}>
      <Flex>
        <UnitStatus status={status} />
        <UnitTitle>XZU342LM-001</UnitTitle>
      </Flex>
      <Flex fdc padding={'0 5px'}>
        <Flex className={Classes.TEXT_SMALL} marginBottom={4}>
          <Span marginRight={8}>Takt Time:</Span>
          <Span>5 Hours</Span>
        </Flex>
        <Flex className={Classes.TEXT_SMALL} marginBottom={4}>
          <Span marginRight={8}>MO:</Span>
          <Span>POTK-2018-2073</Span>
        </Flex>
        <Flex className={Classes.TEXT_SMALL}>
          <Span marginRight={8}>Model:</Span>
          <Span>XZU342LM • MDT</Span>
        </Flex>
      </Flex>
    </Wrapper>
  );
}

UnitBox.propTypes = {
  status: PropTypes.string.isRequired,
};

export default UnitBox;
