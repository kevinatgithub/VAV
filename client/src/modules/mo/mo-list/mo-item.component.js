import React from 'react';
import PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import { Flex, Span } from 'core/styled';
import MoStatus from 'modules/common/mo-status/mo-status';
import S from './mo-list.style';

const { Item, Title, StatWrapper, Stat, Divider } = S;

const MoItem = ({ mo, onSelectMo, selectedMoId }) => {
  const labelClass = `${Classes.TEXT_MUTED} ${Classes.TEXT_SMALL}`;

  const handleSelectMo = () => onSelectMo(mo);
  return (
    <Item key={mo.id} interactive onClick={handleSelectMo} className={mo.id === selectedMoId ? Classes.ACTIVE : null}>
      <Flex marginBottom={12}>
        <Flex flex={1} fdc>
          <Title>{mo.id}</Title>
          <Span className={labelClass}>
            {mo.dealer} • {mo.customer}
          </Span>
          {mo.chassisHit &&
            mo.chassisHit.length > 0 &&
              <Flex marginTop={4}>
                <Span className={labelClass}>Chassis found:</Span>
                <Span marginLeft={5} fontWeight={500} className={Classes.TEXT_SMALL}>
                  {mo.chassisHit.join(', ')}
                </Span>
              </Flex>
          }
        </Flex>
        <MoStatus round intent={MoStatus.getStatusIntent(mo.status)}>
          {mo.status}
        </MoStatus>
      </Flex>
      <StatWrapper paddingTop={8}>
        <Stat>
          <Span className={labelClass}>Finished Good</Span>
          <Span className={Classes.TEXT_SMALL} fontWeight='500'>
            {mo.completed}/{mo.completed + mo.unReleased + mo.wip}
          </Span>
        </Stat>
        <Divider />
        <Stat>
          <Span className={labelClass}>WIP</Span>
          <Span className={Classes.TEXT_SMALL} fontWeight='500'>
            {mo.wip}
          </Span>
        </Stat>
        <Divider />
        <Stat>
          <Span className={labelClass}>Unreleased</Span>
          <Span className={Classes.TEXT_SMALL} fontWeight='500'>
            {mo.unReleased}
          </Span>
        </Stat>
      </StatWrapper>
    </Item>
  );
};

MoItem.propTypes = {
  mo: PropTypes.object.isRequired,
  onSelectMo: PropTypes.func.isRequired,
  selectedMoId: PropTypes.string,
};

export default MoItem;
