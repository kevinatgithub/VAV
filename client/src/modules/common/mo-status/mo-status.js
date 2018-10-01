import React from 'react';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';
import style from './mo-status-style';

const { Tag } = style;

function getStatusIntent(status) {
  return (
    {
      InProgress: Intent.PRIMARY,
      Closed: Intent.SUCCESS,
      New: Intent.NONE,
    }[status] || Intent.NONE
  );
}

function getStatusText(status) {
  return (
    {
      InProgress: 'In Progress',
      Closed: 'Closed',
      New: 'New',
    }[status] || Intent.NONE
  );
}

const MoStatus = ({ children, className }) =>
  <Tag className={className} round intent={getStatusIntent(children)}>
    {getStatusText(children)}
  </Tag>;

MoStatus.getStatusIntent = getStatusIntent;
MoStatus.getStatusText = getStatusText;

MoStatus.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default MoStatus;
