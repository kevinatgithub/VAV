import styled from 'styled-components';
import { Navbar as NavbarRaw, NavbarHeading as NavbarHeadingRaw } from '@blueprintjs/core';

const NavbarHeading = styled(NavbarHeadingRaw)`
  display: flex;
  height: 100%;
  align-items: center;
`;

const Navbar = styled(NavbarRaw)`
  padding-right: 5px;
  padding-left: 8px;
`;

export default {
  NavbarHeading,
  Navbar,
};
