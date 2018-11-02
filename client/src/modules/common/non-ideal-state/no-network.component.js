import PropTypes from 'prop-types';
import React from 'react';
import { Flex, CenterBody, Button } from 'core/styled';
import { NonIdealState, Intent } from '@blueprintjs/core';

const NoNetwork = ({ history, location }) => {
  const { from } = location.state || { from: { pathname: '/' } };
  return (
    <CenterBody>
      <Flex fdr jcc>
        <NonIdealState
          icon='offline'
          title='No network connection!'
          description='Please check your network and try again.'
          action={
            <Button intent={Intent.WARNING} icon='refresh' onClick={() => history.replace(from)}>
              Retry
            </Button>
          }
        />
      </Flex>
    </CenterBody>
  );
};

NoNetwork.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default NoNetwork;
