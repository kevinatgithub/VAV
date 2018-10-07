import {
  Colors,
  Card,
  H5,
  ControlGroup as ControlGroupRaw,
  Divider as DividerRaw,
  H3,
} from '@blueprintjs/core';
import InfiniteScrollRaw from 'react-infinite-scroller';
import styled from 'styled-components';
import { Flex } from '../../ui';

const Wrapper = Flex.extend`
  flex-direction: column;
  height: 100%;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  background: #fff;
`;

const Header = Flex.extend`
  flex-direction: column;
  flex-shrink: 0;

  margin: 0 1px;
`;

const Item = styled(Card)`
  flex-direction: column;
  background-color: ${Colors.WHITE};
  border-radius: 0;
  padding: 18px;

  &.bp3-active, &:active, &:focus {
    background-color: ${p => p.theme.color.background};
  }
`;

const Title = styled(H5)`
  margin-bottom: 3px;
`;

const ControlGroup = styled(ControlGroupRaw)`
  padding: 0 4px 2px;
  display: flex;
  flex-shrink: 0;

  .bp3-input-group {
    flex: 1;
  }
`;

const StatWrapper = Flex.extend`
  border-top: 1px dashed ${p => p.theme.color.border};
`;

const Stat = Flex.extend`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Divider = styled(DividerRaw)`
  border-right-style: dashed;
  border-bottom-style: dashed;
`;

const SectionTitle = styled(H3)`
  text-align: center;
  margin-top: 15px;
`;

const InfiniteScroll = styled(InfiniteScrollRaw)`
  display: flex;
  flex-direction: column;
  padding: 1px;
  overflow-y: auto;
`;

export default {
  Wrapper,
  Header,
  Item,
  Title,
  ControlGroup,
  StatWrapper,
  Stat,
  Divider,
  SectionTitle,
  InfiniteScroll,
};
