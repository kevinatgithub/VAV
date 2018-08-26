import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Classes,
  Menu,
  MenuDivider,
  Icon,
} from '@blueprintjs/core';
import styles from './sidebar-style';

const { Wrapper, MenuItem } = styles;

const Sidebar = ({ history, location }) => {
  const linkProps = route => ({
    onClick: () => history.push(route),
    active: location.pathname === route,
  });

  return (
    <Wrapper>
      <Menu className={Classes.ELEVATION_1} >
        <MenuItem {...linkProps('/')} icon={<Icon icon='dashboard' iconSize={20} />} label='Dashboard' />
        <MenuDivider />
        <MenuItem {...linkProps('/not')} icon={<Icon icon='people' iconSize={20} />} label='Users' />
        <MenuDivider />
        <MenuItem {...linkProps('/settings')} icon={<Icon icon='cog' iconSize={20} />} label='Settings' />
      </Menu>
    </Wrapper>
  );
};

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
