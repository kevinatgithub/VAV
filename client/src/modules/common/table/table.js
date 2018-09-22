import React from 'react';
import PropTypes from 'prop-types';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { Icon } from '@blueprintjs/core';
import PageDropdown from './page-dropdown';
import tableStyle from './table-style';
import { Button, Flex } from '../../ui';
import ToolbarWrapper from './toolbar-wrapper';
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
  const tableDefs = React.Children.toArray(children);
  const rowDef = tableDefs.find(t => t.type.name === 'RowDefinition');
  const toolbarDef = tableDefs.find(t => t.type.name === 'Toolbar');

  return (
    <Wrapper width={width}>
      <Griddle
        components={{
          PageDropdown,
          Loading: () => <Flex marginTop={15} marginBottom={15}>Loading...</Flex>,
          NoResults: () => <Flex marginTop={15} marginBottom={15}>No results found.</Flex>,
          Filter: props => <ToolbarWrapper {...props} >{toolbarDef.props.children}</ToolbarWrapper>,
          NextButton: props => <Button {...props} icon='chevron-right' disabled={!props.hasNext} />,
          PreviousButton: props => <Button {...props} icon='chevron-left' disabled={!props.hasPrevious} />,
        }}
        className={className}
        data={data}
        plugins={[plugins.LocalPlugin]}
        enableSettings={false}
        styleConfig={tableStyleConfig}
      >
        {rowDef &&
          <RowDefinition>
            {React.Children.map(
              rowDef.props.children,
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
Table.Toolbar = Toolbar;

Table.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.node,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  customComponent: PropTypes.node,
};

export default Table;
