import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Divider } from '@blueprintjs/core';
import { Flex } from 'core/styled';

const ToolbarWrapper = ({ className, setFilter, children }) => {
  const handleChange = e => setFilter(e.target.value);

  return (
    <Flex jcfs>
      <InputGroup
        style={{ minWidth: '220px' }}
        leftIcon='filter'
        onChange={handleChange}
        placeholder='Enter a keyword to filter...'
        className={className}
      />
      {React.Children.map(children, (child, i) =>
        <React.Fragment key={i}>
          <Divider />
          {child}
        </React.Fragment>,
      )}
    </Flex>
  );
};

ToolbarWrapper.propTypes = {
  setFilter: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ToolbarWrapper;
