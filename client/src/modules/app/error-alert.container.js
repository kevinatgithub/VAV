import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Intent, Classes } from '@blueprintjs/core';
import { Alert, ErrorIcon, Title } from './error-alert.style';

function ErrorAlert({ errorMessage, isOpen, onClose }) {
  return (
    <Alert intent={Intent.DANGER} className={Classes.DARK} isOpen={isOpen} onClose={onClose} confirmButtonText='Okay'>
      <ErrorIcon intent={Intent.DANGER} icon='error' iconSize={60} />
      <Title>An error occured!</Title>
      <p>{errorMessage}</p>
      <p>Please contact administrator for assistance.</p>
    </Alert>
  );
}

ErrorAlert.propTypes = {
  errorMessage: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({ app }) => ({
  isOpen: app.showErrorAlert,
  errorMessage: app.errorMessage,
});

const mapActionsToProps = ({ app: { disposeError } }) => ({
  onClose: () => disposeError(false),
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(ErrorAlert);
