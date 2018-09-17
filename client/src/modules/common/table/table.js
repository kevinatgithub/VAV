import React from 'react';
import PropTypes from 'prop-types';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { Icon, H6 } from '@blueprintjs/core';
import PageDropdown from './page-dropdown';
import tableStyle from './table-style';
import { Button, Flex } from '../../ui';
import Toolbar from './toolbar';

const { Wrapper } = tableStyle;

const tableStyleConfig = {
  classNames: {
    Table: 'bp3-html-table bp3-html-table-striped',
  },
  icons: {
    TableHeadingCell: {
      sortDescendingIcon: <Icon icon='caret-down' />,
      sortAscendingIcon: <Icon icon='caret-up' />,
    },
  },
};

const actionsHeading = () => <Flex jcc>Actions</Flex>;
const actionsSort = dataToSort => dataToSort;

const Table = ({ data, className, children, width }) => {
  const RowDef = React.Children.only(children);

  return (
    <Wrapper width={width}>
      <Griddle
        components={{
          PageDropdown,
          Loading: () => <H6>Loading...</H6>,
          Filter: props => <Toolbar {...props} />,
          NextButton: props => <Button {...props} icon='chevron-right' disabled={!props.hasNext} />,
          PreviousButton: props => <Button {...props} icon='chevron-left' disabled={!props.hasPrevious} />,
        }}
        className={className}
        data={data}
        plugins={[plugins.LocalPlugin]}
        enableSettings={false}
        styleConfig={tableStyleConfig}
      >
        {
          <RowDefinition>
            {React.Children.map(
              RowDef.props.children,
              ({ props: { actions, ...props } }) =>
                actions ?
                  <Table.ColumnDefinition
                    id={props.id}
                    customHeadingComponent={actionsHeading}
                    sortMethod={actionsSort}
                    customComponent={props.customComponent}
                  />
                  :
                  <Table.ColumnDefinition {...props} />
              ,
            )}
          </RowDefinition>
        }
      </Griddle>
    </Wrapper>
  );
};

Table.RowDefinition = RowDefinition;
Table.ColumnDefinition = ColumnDefinition;

Table.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  customComponent: PropTypes.node,
};

export default Table;
