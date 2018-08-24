import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logEvent, logException, trackPageView } from '../containers/logging-actions';

/**
 * Higher order component with logging props (trackLog, trackError, trackInfo, trackPageView)
 */
export default function() {
  return (WrappedComponent) => {
    class WithLogger extends Component {
      constructor(props) {
        super(props);
        this.info = this.info.bind(this);
        this.error = this.error.bind(this);
        this.log = this.log.bind(this);
        this.trackPageView = this.trackPageView.bind(this);
      }
      info(args) {
        this.props.logEvent(args);
      }
      error(args) {
        this.props.logException(args);
      }
      log(args) {
        this.props.logEvent(args);
      }
      trackPageView(args) {
        this.props.trackPageView(args);
      }
      render() {
        return (
          <WrappedComponent
            {...this.props}
            trackLog={this.log}
            trackError={this.error}
            trackInfo={this.info}
            trackPageView={this.trackPageView}
          />
        );
      }
    }
    WithLogger.propTypes = {
      logEvent: PropTypes.func.isRequired,
      logException: PropTypes.func.isRequired,
      trackPageView: PropTypes.func.isRequired,
    };
    const mapStateToProps = () => ({});
    const mapDispatchToProps = {
      logEvent,
      logException,
      trackPageView,
    };
    return connect(mapStateToProps, mapDispatchToProps)(WithLogger);
  };
}
