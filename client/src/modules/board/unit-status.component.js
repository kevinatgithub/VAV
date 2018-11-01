import React from 'react';
import PropTypes from 'prop-types';
import { Inner, Outer } from './unit-status.style';

function UnitStatus({ status, noBlink }) {
  return (
    <Outer status={status} noBlink={noBlink}>
      <Inner status={status} />
    </Outer>
  );
}

UnitStatus.propTypes = {
  status: PropTypes.string.isRequired,
  noBlink: PropTypes.bool,
};

export default UnitStatus;
