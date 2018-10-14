import PropTypes from 'prop-types';
import React from 'react';
import { Flex, CenterBody, Button } from 'core/styled';
import { NonIdealState, Intent } from '@blueprintjs/core';

const PageNotFound = ({ history }) =>
  <CenterBody>
    <Flex fdr jcc>
      <NonIdealState
        icon='error'
        title='404 - Page not found'
        description={'Looks like the page you\'re trying to visit doesn\'t exists.'}
        action={
          <Button intent={Intent.WARNING} icon='home' onClick={() => history.push('/')}>Take Me Home</Button>
        }
      />
    </Flex>
  </CenterBody>;

PageNotFound.propTypes = {
  history: PropTypes.object.isRequired,
};

export default PageNotFound;
