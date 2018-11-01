import React from 'react';
import { Flex, Span } from 'core/styled';
import UnitStatus from './unit-status.component';
import { unitStatus } from '../../core/utils/values';

function StatusLegend() {
  return (
    <Flex>
      <Flex marginRight={20}>
        <UnitStatus status={unitStatus.NORMAL} />
        <Span marginLeft={8}>Normal</Span>
      </Flex>
      <Flex marginRight={20}>
        <UnitStatus status={unitStatus.MATERIAL_CALL} />
        <Span marginLeft={8}>Material Call</Span>
      </Flex>
      <Flex>
        <UnitStatus status={unitStatus.MANAGER_CALL} noBlink />
        <Span marginLeft={8}>Manager Call</Span>
      </Flex>
    </Flex>
  );
}


export default StatusLegend;
