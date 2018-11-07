import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import { Flex, Span } from 'core/styled';
import { Wrapper, UnitTitle } from './unit-box.style';
import UnitStatus from './unit-status.component';
import { unitStatus } from '../../core/utils/values';

class UnitBox extends Component {
  constructor(props) {
    super(props);
    const { unit } = props;
    const timeInDate = new Date(`${unit.timeIn}Z`);
    const endDate = new Date(`${unit.timeIn}Z`);
    endDate.setMinutes(endDate.getMinutes() + 1);
    this.state = { taktTimeReached: endDate.getTime() <= timeInDate.getTime(), endDateTime: endDate.getTime() };

    this.timer = setInterval(() => {
      const now = new Date().getTime();
      this.setState(state => ({
        taktTimeReached: state.endDateTime <= now,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getStatus() {
    if (this.state.taktTimeReached) {
      return unitStatus.MANAGER_CALL;
    } else if (this.props.unit.isMc) {
      return unitStatus.MATERIAL_CALL;
    }
    return unitStatus.NORMAL;
  }

  render() {
    const { unit } = this.props;
    const [chassisModelCode] = unit.modelName.split(' ');
    const modelSeparator = chassisModelCode && unit.bodyTypeName ? ' • ' : '';

    return (
      <Wrapper className={Classes.ELEVATION_1}>
        <Flex>
          <UnitStatus status={this.getStatus()} />
          <UnitTitle>{unit.chassisNumber}</UnitTitle>
        </Flex>
        <Flex fdc padding={'0 5px'}>
          <Flex className={Classes.TEXT_SMALL} marginBottom={4}>
            <Span marginRight={8}>Takt Time:</Span>
            <Span>{unit.workTime} Minute(s)</Span>
          </Flex>
          <Flex className={Classes.TEXT_SMALL} marginBottom={4}>
            <Span marginRight={8}>MO:</Span>
            <Span>{unit.moNumber}</Span>
          </Flex>
          <Flex className={Classes.TEXT_SMALL}>
            <Span marginRight={8}>Model:</Span>
            <Span>
              {chassisModelCode}
              {modelSeparator}
              {unit.bodyTypeName}
            </Span>
          </Flex>
        </Flex>
      </Wrapper>
    );
  }
}

UnitBox.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default UnitBox;
