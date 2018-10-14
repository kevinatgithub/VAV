import React from 'react';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';
import { Button, Card, CardBody } from 'core/styled';
import Table from '../common/table/table.component';
import CommonActions from '../common/table/common-actions.component';

function TaktimeTable({ taktimes, onShowTaktimeForm, onTaktimeEdit, onTaktimeDelete }) {
  // eslint-disable-next-line react/prop-types
  const Actions = ({ value }) => <CommonActions value={value} onEdit={onTaktimeEdit} onDelete={onTaktimeDelete} />;

  return (
    <Card>
      <CardBody>
        <Table data={taktimes} width='100%'>
          <Table.RowDefinition>
            <Table.ColumnDefinition id='chassisModelName' title='Chassis Model' order={1} />
            <Table.ColumnDefinition id='bodyTypeName' title='Body Type' order={2} />
            <Table.ColumnDefinition id='workTime' title='Tak Time (mins)' order={3} />
            <Table.ColumnDefinition actions id='id' customComponent={Actions} />
          </Table.RowDefinition>
          <Table.Toolbar>
            <Button intent={Intent.PRIMARY} icon='plus' onClick={onShowTaktimeForm}>Add Tak Time</Button>
          </Table.Toolbar>
        </Table>
      </CardBody>
    </Card>
  );
}

TaktimeTable.propTypes = {
  taktimes: PropTypes.array,
  onShowTaktimeForm: PropTypes.func.isRequired,
  onTaktimeEdit: PropTypes.func.isRequired,
  onTaktimeDelete: PropTypes.func.isRequired,
};

export default TaktimeTable;
