import { connect } from 'react-redux';
import LoginComponent from '../components/login.component';
import { getUserRequest } from '../../user/containers/user-actions';

/**
 * Higher order function that will validate authentication before rendering component
 * @param {Component} ComposedComponent Component that will be rendered after successful authentication
 */
export default function(ComposedComponent) {
  const mapStateToProps = state => ({
    userDetails: state.user.details,
    userLoading: state.user.loading,
    composedComponent: ComposedComponent,
  });

  const mapDispatchToProps = {
    getUserRequest,
  };

  return connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
}
