import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { InputGroup } from '@blueprintjs/core';
import { Flex, Span, Select, Button, Spinner } from '../../ui';
import styles from './mo-list-style';
import MoItem from './mo-item';
import { moStatuses } from '../../utils/values';
import MoStatus from '../../common/mo-status/mo-status';

const { Wrapper, ControlGroup, SectionTitle } = styles;

const statusOptions = [
  { value: '', label: 'All' },
  { value: moStatuses.CLOSED, label: MoStatus.getStatusText(moStatuses.CLOSED) },
  { value: moStatuses.IN_PROGRESS, label: MoStatus.getStatusText(moStatuses.IN_PROGRESS) },
  { value: moStatuses.NEW, label: MoStatus.getStatusText(moStatuses.NEW) },
];

const MoList = ({ mos, onLoadMore, onFilterByStatus, ...rest }) => {
  const handleStatusFilterChange = (e) => {
    onFilterByStatus(e.target.value);
  };
  return (
    mos &&
      <Wrapper>
        <SectionTitle>Manufacturing Orders</SectionTitle>
        <ControlGroup>
          <Select options={statusOptions} onChange={handleStatusFilterChange} />
          <InputGroup placeholder='Search...' />
          <Button icon='search' />
        </ControlGroup>
        <Flex fdc overflowY={'auto'} padding={1}>
          <InfiniteScroll
            pageStart={1}
            loadMore={onLoadMore}
            threshold={180}
            hasMore={mos.page < mos.totalPages}
            loader={
              <Flex key={0} jcc aic padding={10}>
                <Spinner size={Spinner.SIZE_SMALL} />
                <Span marginLeft={5}>Loading...</Span>
              </Flex>
            }
            useWindow={false}
          >
            {mos.result.map(mo =>
              <MoItem key={mo.id} mo={mo} {...rest} />,
            )}
          </InfiniteScroll>
        </Flex>
      </Wrapper>

  );
};

MoList.propTypes = {
  mo: PropTypes.object,
  selectedMoId: PropTypes.string,
  onLoadMore: PropTypes.func,
  onSelectMo: PropTypes.func,
  onFilterByStatus: PropTypes.func,
};

export default MoList;
