import styled from 'styled-components';
import { Flex, Div } from 'core/styled';
import { H5, Colors, Divider, Switch } from '@blueprintjs/core';

export const Wrapper = styled(Div)`
  padding-top: 10px;

  &.bp3-dark {
    background-color: ${Colors.DARK_GRAY5};
  }
`;

export const Section = styled(Flex)`
  flex-basis: 12.5%;
  flex: 1;
  flex-direction: column;

  &:not(:last-child) {
    border-right: 1px dashed rgba(16, 22, 26, 0.15);
  }

  &.bp3-dark:not(:last-child) {
    border-right: 1px dashed rgba(255, 255, 255, 0.15);
  }
`;

export const SectionTitle = styled(H5)`
  text-align: center;
`;

export const SectionBody = styled(Flex)`
  padding: 8px;
  margin-right: -8px;
  flex-wrap: wrap;

  .bp3-card:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const Separator = styled(Divider)`
  margin: 0 15px;
  height: 20px;
`;

export const MonitorModeToggle = styled(Switch)`
  margin-bottom: 0;
`;
