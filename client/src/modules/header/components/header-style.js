import styled from 'styled-components';
import {
  Navbar as NavbarRaw,
  NavbarHeading as NavbarHeadingRaw,
  NavbarGroup as NavbarGroupRaw,
} from '@blueprintjs/core';

const NavbarHeading = styled(NavbarHeadingRaw)`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Navbar = styled(NavbarRaw)`
  padding-right: 5px;
  padding-left: 8px;
  height: 53px;
`;

const NavbarGroup = styled(NavbarGroupRaw)`
  padding-right: 5px;
  padding-left: 0;
  height: 53px;
`;

export default {
  NavbarHeading,
  Navbar,
  NavbarGroup,
};
