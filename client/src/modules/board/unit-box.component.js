import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Classes, ProgressBar, Intent } from '@blueprintjs/core';
import { Flex, Span } from 'core/styled';
import { Wrapper, UnitTitle, Progress } from './unit-box.style';
import { unitStatus } from '../../core/utils/values';

class UnitBox extends Component {
  constructor(props) {
    super(props);
    const { unit } = props;
    const endDate = new Date(`${unit.timeIn}Z`);
    endDate.setMinutes(endDate.getMinutes() + unit.workTime);
    const progress = this.getProgress(endDate.getTime(), unit.workTime);

    this.state = {
      progress,
      taktTimeReached: progress >= 1,
      endDateTime: endDate.getTime(),
    };

    this.timer = this.startTimer();
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

  getProgress = (endDateTime, workTime) => {
    const difference = endDateTime - Date.now();
    const resultInMinutes = Math.round(((difference % 86400000) % 3600000) / 60000);
    const progress = (workTime - resultInMinutes) / workTime;
    return progress;
  }

  startTimer() {
    return setInterval(() => {
      this.setState((state, props) => {
        const progress = this.getProgress(state.endDateTime, props.unit.workTime);
        return {
          taktTimeReached: progress >= 1,
          progress,
        };
      });
    }, 60000);
  }

  render() {
    const { unit } = this.props;
    const [chassisModelCode] = unit.modelName.split(' ');
    const modelSeparator = chassisModelCode && unit.bodyTypeName ? ' • ' : '';

    return (
      <Wrapper className={`${Classes.ELEVATION_1} ${Classes.DARK}`} status={unitStatus.NORMAL}>
        <Flex>
          <UnitTitle>{unit.chassisNumber}</UnitTitle>
        </Flex>
        <Flex fdc padding={'0 5px'}>
          <Progress className={Classes.TEXT_SMALL} marginBottom={4}>
            <Span marginRight={8}>Progress: </Span>
            <ProgressBar stripes={false} animate={false} intent={Intent.PRIMARY} value={this.state.progress} />
          </Progress>
          <Flex className={Classes.TEXT_SMALL} marginBottom={4}>
            <Span marginRight={8}>Takt Time:</Span>
            <Span>{unit.workTime} Minute(s)</Span>
          </Flex>
          <Flex className={Classes.TEXT_SMALL} marginBottom={4}>
            <Span marginRight={8}>Customer:</Span>
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
