import styled from 'styled-components';
import { Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

export const SectionsWrapper = styled(Menu)`
  height: 100%;
  width: 100%;
  border-radius: 0;
`;

export const SectionsHeader = styled(MenuDivider)`
  .bp3-heading {
    font-size: 22px;
    line-height: 1.5;
  }
`;

export const SectionDivider = styled(MenuDivider)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Section = styled(MenuItem)`
  padding: 10px 12px;
`;
