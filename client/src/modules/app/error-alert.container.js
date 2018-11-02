import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Intent, Classes } from '@blueprintjs/core';
import { Alert, ErrorIcon, Title } from './error-alert.style';
import { errorTypes } from '../../core/utils/values';

function ErrorAlert({ error, isOpen, onClose }) {
  if (!error) {
    return null;
  }

  const icon = error.type === errorTypes.NETWORK ? 'offline' : 'error';
  const title = error.type === errorTypes.NETWORK ? 'No network connection!' : 'An error occured!';
  const message = error.type === errorTypes.NETWORK ? '' : error.message;
  const footer =
    error.type === errorTypes.NETWORK
      ? 'Please check your network and try again.'
      : 'Please contact administrator for assistance.';

  return (
    <Alert intent={Intent.DANGER} className={Classes.DARK} isOpen={isOpen} onClose={onClose} confirmButtonText='Okay'>
      <ErrorIcon intent={Intent.DANGER} icon={icon} iconSize={60} />
      <Title>{title}</Title>
      {message && <p>{message}</p>}
      <p>{footer}</p>
    </Alert>
  );
}

ErrorAlert.propTypes = {
  error: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({ app }) => ({
  isOpen: app.showErrorAlert,
  error: app.error,
});

const mapActionsToProps = ({ app: { disposeError } }) => ({
  onClose: () => disposeError(false),
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(ErrorAlert);
