import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

const MyLoadingComponent = (props) => {
  if (props.isLoading) {
    // While our other component is loading...
    if (props.timedOut) {
      // In case we've timed out loading our other component.
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      // Display a loading screen after a 200ms delay.
      return <div>Loading...</div>;
    }
    // Don't flash "Loading..." when we don't need to.
    return null;
  } else if (props.error) {
    // If we aren't loading, maybe
    return <div>Error! Component failed to load</div>;
  }
  return null;
};

MyLoadingComponent.propTypes = {
  isLoading: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.object,
};

const LoadableComponent = opts =>
  Loadable({
    loading: MyLoadingComponent,
    delay: 200,
    ...opts,
  });

export default LoadableComponent;
