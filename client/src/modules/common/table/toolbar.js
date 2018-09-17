import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Divider, Intent } from '@blueprintjs/core';
import { Flex, Button } from '../../ui';

const Toolbar = ({ className, setFilter }) => {
  const handleChange = e => setFilter(e.target.value);

  return (
    <Flex jcfs>
      <InputGroup
        style={{ minWidth: '220px' }}
        leftIcon='filter'
        onChange={handleChange}
        placeholder='Enter keyword to filter...'
        className={className}
      />
      <Divider />
      <Button icon='plus' intent={Intent.PRIMARY}>Add Body Type</Button>
    </Flex>
  );
};

Toolbar.propTypes = {
  setFilter: PropTypes.func,
  className: PropTypes.string,
};

export default Toolbar;
