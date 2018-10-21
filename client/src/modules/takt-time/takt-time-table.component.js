import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Intent, H3 } from '@blueprintjs/core';
import { Card, CardBody, CardHeader, Button } from 'core/styled';
import CommonActions from '../common/table/common-actions.component';

function TaktimeTable({
  section,
  taktTimes,
  loading,
  onShowTaktimeForm,
  onTaktTimeEdit,
  onTaktTimeDelete,
  showChassisModel,
  showBodyType,
}) {
  // eslint-disable-next-line react/prop-types
  const Actions = ({ value }) => (
    <CommonActions name='Takt Time' value={value} onEdit={() => onTaktTimeEdit(value)} onDelete={() => onTaktTimeDelete(value)} />
  );

  return (
    <Card>
      <CardHeader jcsb>
        <H3>{section}</H3>
        <Button intent={Intent.PRIMARY} icon='plus' onClick={onShowTaktimeForm}>
          Add
        </Button>
      </CardHeader>
      <CardBody tableMode>
        <ReactTable
          data={taktTimes || []}
          loading={loading}
          columns={[
            {
              Header: 'Chassis Model',
              accessor: 'chassisModelName',
              show: showChassisModel,
            },
            {
              Header: 'Body Type',
              accessor: 'bodyTypeName',
              show: showBodyType,
            },
            {
              Header: 'Takt Time (mins)',
              accessor: 'workTime',
            },
            {
              Header: 'Actions',
              accessor: 'id',
              Cell: Actions,
              sortable: false,
            },
          ]}
          defaultPageSize={10}
          className='-striped -highlight'
        />
      </CardBody>
    </Card>
  );
}

TaktimeTable.propTypes = {
  section: PropTypes.string,
  taktTimes: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  showChassisModel: PropTypes.bool.isRequired,
  showBodyType: PropTypes.bool.isRequired,
  onShowTaktimeForm: PropTypes.func.isRequired,
  onTaktTimeEdit: PropTypes.func.isRequired,
  onTaktTimeDelete: PropTypes.func.isRequired,
};

export default TaktimeTable;
