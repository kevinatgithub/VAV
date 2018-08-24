import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import authentication from 'utils/auth.manager';
import localStorageManager from 'utils/localStorageManager';
import AuthSplash from './auth-splash.component';
import LoadingIndicator from '../../common/loading-indicator/components/loading-indicator';

class LoginComponent extends Component {
  state = {};

  componentDidMount() {
    const { userDetails, userLoading, getUserRequest } = this.props;
    const { response } = authentication().getCachedToken();
    if (!userLoading && !userDetails && response) {
      getUserRequest();
    }
  }

  /**
   * Sign in
   */
  handleLogin() {
    authentication(localStorageManager.getItem(STORAGE_NAME)).login();
  }

  handleRegister = () => {
    this.props.history.push('register');
  }

  handleResetPassword() {
    const { passwordresetUrl } = localStorageManager.getItem(STORAGE_NAME);
    window.open(passwordresetUrl, '_blank');
  }

  render() {
    const { userDetails, userLoading, composedComponent: ComposedComponent, t } = this.props;
    const { response } = authentication().getCachedToken();

    // user should have details as well
    const userAuthorized = !!userDetails && !!response;

    return (
      <div>
        {userLoading && <LoadingIndicator /> }
        {userAuthorized && <ComposedComponent />}
        {!response &&
          <AuthSplash
            onLogin={this.handleLogin}
            onRegister={this.handleRegister}
            onResetPassword={this.handleResetPassword}
            t={t}
          />
        }
      </div>
    );
  }
}
LoginComponent.propTypes = {
  userDetails: PropTypes.object,
  userLoading: PropTypes.bool.isRequired,
  getUserRequest: PropTypes.func.isRequired,
  composedComponent: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default translate('translations')(LoginComponent);
