import React from 'react';
import {
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

const { NavbarHeading, Navbar, NavbarGroup } = headerStyles;

const Header = () => {
  const fileMenu =
    <Menu>
      <MenuItem text='Logout' icon='log-out' />
    </Menu>;
  return (
    <Navbar className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <Image src={images.hinoLogo} width={134} height={'auto'} />
          <Span fontSize={17} fontWeight={'bold'} marginLeft={8}>
              VAVB
          </Span>
          <Span marginLeft={8} marginTop={0} fontSize={13}>v1.0</Span>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button className={Classes.MINIMAL} icon='notifications' />
        <NavbarDivider />
        <Button className={Classes.MINIMAL} icon='help' />
        <NavbarDivider />
        <Popover content={fileMenu} position={Position.BOTTOM_RIGHT} interactionKind={PopoverInteractionKind.CLICK}>
          <Button className={Classes.MINIMAL} icon='user' text='John Doe' />
        </Popover>
      </NavbarGroup>
    </Navbar>
  );
};

export default Header;
