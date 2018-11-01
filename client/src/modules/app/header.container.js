import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { Image, Span } from 'core/styled';
import images from 'core/utils/images';
import headerStyles from './header.style';

const { NavbarHeading, Navbar, NavbarGroup } = headerStyles;

const Header = ({ showHeader }) => {
  const fileMenu = (
    <Menu>
      <MenuItem text='Logout' icon='log-out' />
    </Menu>
  );

  return (
    showHeader && (
      <Navbar className={Classes.DARK}>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>
            <Image src={images.hinoLogo} width={134} height={'auto'} />
            <Span fontSize={17} fontWeight={'bold'} marginLeft={8}>
              VALV
            </Span>
            <Span marginLeft={8} marginTop={0} fontSize={13}>
              v1.0
            </Span>
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
    )
  );
};

Header.propTypes = {
  showHeader: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ app }) => ({
  showHeader: app.showHeader,
});

export default connect(
  mapStateToProps,
  null,
)(Header);
