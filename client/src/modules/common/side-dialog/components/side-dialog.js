import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'common/loading-bar/components/loading-bar';
import { Flex } from 'ui';
import style from './side-dialog-style';
import { Div } from '../../../ui';

const { Dialog } = style;

class SideDialog extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    loading: PropTypes.bool,
    isSideDialogOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  state = {};

  render() {
    const { title, icon, loading, isSideDialogOpen, onClose, children } = this.props;

    return (
      <Dialog
        canOutsideClickClose={false}
        canEscapeKeyClose={false}
        icon={icon}
        isOpen={isSideDialogOpen}
        onClose={onClose}
        title={title}
        backdropClassName='side-dialog-backdrop'
        transitionName='slide'
        transitionDuration={300}
      >
        <Div flex={1}>
          <LoadingBar visible={loading} />
          <Flex flex={1} margin={25}>
            {children(onClose)}
          </Flex>
        </Div>
      </Dialog>
    );
  }
}

export default SideDialog;
