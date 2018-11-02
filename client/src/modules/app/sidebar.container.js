import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Classes, Menu, MenuDivider, Icon, MenuItem } from '@blueprintjs/core';
import styles from './sidebar.style';
import { TRANSITION_TIMEOUT } from '../../core/utils/values';

const { Wrapper } = styles;

const Sidebar = ({ history, location, showSidebar }) => {
  const linkProps = route => ({
    onClick: () => history.push(route),
    active: location.pathname === route,
  });

  return (
    <CSSTransition in={showSidebar} unmountOnExit timeout={TRANSITION_TIMEOUT} classNames='slideHorizontal'>
      <Wrapper>
        <Menu className={Classes.ELEVATION_2}>
          <MenuItem {...linkProps('/')} icon={<Icon icon='dashboard' iconSize={20} />} text='Board' />
          <MenuDivider />
          <MenuItem {...linkProps('/mo')} icon={<Icon icon='multi-select' iconSize={20} />} text='MO' />
          <MenuDivider />
          <MenuItem {...linkProps('/users')} icon={<Icon icon='people' iconSize={20} />} text='Users' />
          <MenuDivider />
          <MenuItem {...linkProps('/takt-time')} icon={<Icon icon='time' iconSize={20} />} text='Takt Time' />
        </Menu>
      </Wrapper>
    </CSSTransition>
  );
};

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  showSidebar: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ app }) => ({
  showSidebar: app.showSidebar,
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null,
  ),
)(Sidebar);
