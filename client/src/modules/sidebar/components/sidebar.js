import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Classes,
  Menu,
  MenuDivider,
  Icon,
  MenuItem,
} from '@blueprintjs/core';
import styles from './sidebar-style';

const { Wrapper } = styles;

const Sidebar = ({ history, location }) => {
  const linkProps = route => ({
    onClick: () => history.push(route),
    active: location.pathname === route,
  });

  return (
    <Wrapper>
      <Menu className={Classes.ELEVATION_0}>
        <MenuItem {...linkProps('/')} icon={<Icon icon='dashboard' iconSize={20} />} text='Board' />
        <MenuDivider />
        <MenuItem {...linkProps('/mo')} icon={<Icon icon='multi-select' iconSize={20} />} text='MO' />
        <MenuDivider />
        <MenuItem {...linkProps('/users')} icon={<Icon icon='people' iconSize={20} />} text='Users' />
        <MenuDivider />
        <MenuItem {...linkProps('/settings')} icon={<Icon icon='cog' iconSize={20} />} text='Settings' />
      </Menu>
    </Wrapper>
  );
};

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
