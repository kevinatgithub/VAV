import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { InputGroup, Classes } from '@blueprintjs/core';
import { Flex, Span, Select, Spinner } from '../../ui';
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

const MoList = ({ mos, onLoadMore, onFilterByStatus, onSearch, ...rest }) => {
  const handleStatusFilterChange = (e) => {
    onFilterByStatus(e.target.value);
  };

  const handleKeyPress = ({ key, target }) => {
    if (key === 'Enter') {
      onSearch(target.value);
    }
  };

  return (
    mos &&
      <Wrapper className={Classes.ELEVATION_2}>
        <SectionTitle>Manufacturing Orders</SectionTitle>
        <ControlGroup>
          <InputGroup placeholder='Enter a keyword to search...' onKeyPress={handleKeyPress} />
          <Select options={statusOptions} onChange={handleStatusFilterChange} />
        </ControlGroup>
        <Flex fdc overflowY={'auto'}>
          <InfiniteScroll
            pageStart={1}
            loadMore={onLoadMore}
            threshold={200}
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
  onLoadMore: PropTypes.func.isRequired,
  onSelectMo: PropTypes.func.isRequired,
  onFilterByStatus: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default MoList;
