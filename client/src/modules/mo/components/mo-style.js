import {
  Colors,
  Card,
  H5,
  Tag as TagRaw,
  ControlGroup as ControlGroupRaw,
  Divider as DividerRaw,
  H3,
} from '@blueprintjs/core';
import styled from 'styled-components';
import { Flex } from '../../ui';

const Wrapper = Flex.extend`
  flex-direction: column;
`;

const Item = styled(Card)`
  flex-direction: column;
  background-color: ${Colors.WHITE};
  border-radius: 0;
`;

const Title = styled(H5)`
  margin-bottom: 3px;
`;

const Tag = styled(TagRaw)`
  line-height: 1;
  height: 20px;
  width: 80px;
  text-align: center;
`;

const ControlGroup = styled(ControlGroupRaw)`
  padding-bottom: 2px;
  display: flex;

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
`;

export default {
  Wrapper,
  Item,
  Title,
  Tag,
  ControlGroup,
  StatWrapper,
  Stat,
  Divider,
  SectionTitle,
};
