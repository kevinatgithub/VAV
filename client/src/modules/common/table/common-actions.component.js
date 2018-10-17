import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Button } from 'core/styled';
import { Tooltip, Position, Intent } from '@blueprintjs/core';
import PopoverConfirmDelete from '../popover-confirm-delete/popover-confirm-delete';

function CommonActions({ value, onEdit, onDelete, name }) {
  const handleEdit = () => {
    onEdit(value);
  };
  const handleDelete = () => {
    onDelete(value);
  };
  return (
    <Flex jcc>
      <Tooltip content='Edit' position={Position.LEFT}>
        <Button
          icon='annotation'
          minimal
          marginRight={2}
          intent={Intent.PRIMARY}
          minHeight={25}
          onClick={handleEdit}
        />
      </Tooltip>
      <PopoverConfirmDelete name={name} onDelete={handleDelete}>
        <Tooltip content='Delete' position={Position.RIGHT}>
          <Button icon='trash' minimal marginLeft={2} intent={Intent.DANGER} minHeight={25} />
        </Tooltip>
      </PopoverConfirmDelete>
    </Flex>
  );
}

CommonActions.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CommonActions;
