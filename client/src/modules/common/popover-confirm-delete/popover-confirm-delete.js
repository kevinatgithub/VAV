import React from 'react';
import PropTypes from 'prop-types';
import { Classes, Popover, PopoverInteractionKind, Position, Intent, H5 } from '@blueprintjs/core';
import { Flex, Div, Button } from '../../ui';

const PopoverConfirmDelete = ({ children, name, onDelete }) => {
  const fileMenu =
    <Div>
      <H5>Confirm deletion</H5>
      <p>{`Are you sure you want to delete this ${name || 'item'}? This will be deleted permanently.`}</p>
      <Flex jcfe marginTop={15}>
        <Button className={Classes.POPOVER_DISMISS} marginRight={10}>
          Cancel
        </Button>
        <Button onClick={onDelete} intent={Intent.DANGER} className={Classes.POPOVER_DISMISS}>
          Delete
        </Button>
      </Flex>
    </Div>;
  return (
    <Popover
      content={fileMenu}
      popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      position={Position.BOTTOM_RIGHT}
      interactionKind={PopoverInteractionKind.CLICK}
    >
      {children}
    </Popover>
  );
};

PopoverConfirmDelete.propTypes = {
  children: PropTypes.node.isRequired,
  onDelete: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default PopoverConfirmDelete;
