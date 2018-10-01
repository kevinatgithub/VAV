import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { SHOW_SIDE_DIALOG } from './side-dialog-action-types';

export const isSideDialogOpen = handleActions(
  {
    [SHOW_SIDE_DIALOG]: (_, { payload }) => payload,
  },
  false,
);

export default combineReducers({
  isSideDialogOpen,
});
