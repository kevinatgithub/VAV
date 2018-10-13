import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import { InputGroup, Classes } from '@blueprintjs/core';
import { Flex, Span, Select, Spinner } from 'core/styled';
import { moStatus } from 'core/utils/values';
import MoStatus from 'modules/common/mo-status/mo-status';
import styles from './mo-list.style';
import MoItem from './mo-item.component';

const { Wrapper, ControlGroup, HeaderTitle, Header } = styles;

const statusOptions = [
  { value: '', label: 'All' },
  { value: moStatus.CLOSED, label: MoStatus.getStatusText(moStatus.CLOSED) },
  { value: moStatus.IN_PROGRESS, label: MoStatus.getStatusText(moStatus.IN_PROGRESS) },
  { value: moStatus.NEW, label: MoStatus.getStatusText(moStatus.NEW) },
];

function MoList({ mos, onLoadMore, onFilterByStatus, onSearch, ...rest }) {
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
        <Header>
          <Flex flex={1} jcc>
            <HeaderTitle>Manufacturing Orders</HeaderTitle>
          </Flex>
        </Header>
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
}

MoList.propTypes = {
  mo: PropTypes.object,
  selectedMoId: PropTypes.string,
  onLoadMore: PropTypes.func.isRequired,
  onSelectMo: PropTypes.func.isRequired,
  onFilterByStatus: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default MoList;
