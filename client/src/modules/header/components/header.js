import React from 'react';
import {
  NavbarGroup,
  NavbarDivider,
  Classes,
  Alignment,
  Button,
  Popover,
  Menu,
  MenuItem,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core';
import { Image, Span } from '../../ui';
import images from '../../utils/images';
import headerStyles from './header-style';

const { NavbarHeading, Navbar } = headerStyles;

const Header = () => {
  const fileMenu =
    <Menu>
      <MenuItem text='Logout' icon='log-out' />
    </Menu>;
  return (
    <Navbar className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <Image src={images.hinoLogo} width={60} height={'auto'} />
          <Span className={Classes.MONOSPACE_TEXT} marginLeft={10}>Vehicle Tracking System</Span>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button className={Classes.MINIMAL} icon='notifications' />
        <NavbarDivider />
        <Popover content={fileMenu} position={Position.BOTTOM_RIGHT} interactionKind={PopoverInteractionKind.HOVER}>
          <Button className={Classes.MINIMAL} icon='user' text='John Doe' />
        </Popover>
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
