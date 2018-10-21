import {
  Colors,
  Card,
  H5,
  ControlGroup as ControlGroupRaw,
  Divider as DividerRaw,
  H3,
  Icon,
} from '@blueprintjs/core';
import InfiniteScrollRaw from 'react-infinite-scroller';
import styled from 'styled-components';
import { Flex, CardHeader } from 'core/styled';

const Wrapper = styled(Flex)`
  flex-direction: column;
  height: 100%;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  background: #fff;
`;

const Header = styled(CardHeader)`
  padding-top: 10px;
  padding-bottom: 10px;
  flex-shrink: 0;
  box-shadow: none;
`;

const Item = styled(Card)`
  flex-direction: column;
  background-color: ${Colors.WHITE};
  border-radius: 0;
  padding: 18px 20px;

  &.bp3-active, &:active, &:focus {
    background-color: ${p => p.theme.color.background2};
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

const StatWrapper = styled(Flex)`
  border-top: 1px dashed ${p => p.theme.color.border};
`;

const Stat = styled(Flex)`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Divider = styled(DividerRaw)`
  border-right-style: dashed;
  border-bottom-style: dashed;
`;

const InfiniteScroll = styled(InfiniteScrollRaw)`
  display: flex;
  flex-direction: column;
  padding: 1px;
  overflow-y: auto;
`;

const ChassisInfoIcon = styled(Icon)`
  margin-right: 4px;
  margin-top: 1px;
`;

const HeaderTitle = styled(H3)`
  &.bp3-heading {
    margin-bottom: 0;
    margin-right: 15px;
    line-height: 1.5;
  }
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
  InfiniteScroll,
  ChassisInfoIcon,
  HeaderTitle,
};
