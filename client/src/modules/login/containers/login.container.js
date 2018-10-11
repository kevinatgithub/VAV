import { connect } from 'react-redux';
import LoginComponent from '../components/login.component';

/**
 * Higher order function that will validate authentication before rendering component
 * @param {Component} ComposedComponent Component that will be rendered after successful authentication
 */
export default function(ComposedComponent) {
  const mapStateToProps = () => ({
    userDetails: null,
    userLoading: null,
    composedComponent: ComposedComponent,
  });

  const mapDispatchToProps = {
  };

  return connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
}
