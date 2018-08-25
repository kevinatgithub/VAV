import React from 'react';
import {
  Classes,
  Menu,
  MenuItem,
  MenuDivider,
  Icon,
} from '@blueprintjs/core';
import styles from './sidebar-style';

const { Wrapper } = styles;

const Sidebar = () => {
  return (
    <Wrapper>
      <Menu className={Classes.ELEVATION_1} >
        <MenuItem icon={<Icon icon='dashboard' iconSize={20} />} label='Dashboard' />
        <MenuDivider />
        <MenuItem icon={<Icon icon='people' iconSize={20} />} label='Users' />
        <MenuDivider />
        <MenuItem icon={<Icon icon='cog' iconSize={20} />} label='Settings' />
      </Menu>
    </Wrapper>
  );
};

export default Sidebar;
