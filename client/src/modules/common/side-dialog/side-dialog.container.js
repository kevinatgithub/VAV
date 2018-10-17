import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingBar from 'modules/common/loading-bar/loading-bar.component';
import { Flex, Div } from 'core/styled';
import style from './side-dialog.style';

const { Dialog } = style;

function SideDialog({ title, icon, loading, isSideDialogOpen, onClose, onOpened, children }) {
  return (
    <Dialog
      canOutsideClickClose={false}
      canEscapeKeyClose={true}
      icon={icon}
      isOpen={isSideDialogOpen}
      onClose={onClose}
      onOpened={onOpened}
      title={title}
      backdropClassName='side-dialog-backdrop'
      transitionName='slide'
      transitionDuration={300}
    >
      <Div flex={1} position='relative'>
        <LoadingBar visible={loading} top={1} />
        <Flex flex={1} margin={25}>{children(onClose)}</Flex>
      </Div>
    </Dialog>
  );
}

SideDialog.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  isSideDialogOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpened: PropTypes.func,
  children: PropTypes.func.isRequired,
};

const mapStateToProps = ({ sideDialog }) => ({
  isSideDialogOpen: sideDialog.isSideDialogOpen,
  loading: sideDialog.isLoading,
});

const mapActionsToProps = ({ sideDialog: { showSideDialog } }) => ({
  showSideDialog,
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(SideDialog);
