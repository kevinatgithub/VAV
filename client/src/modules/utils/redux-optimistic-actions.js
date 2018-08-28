import { BEGIN, COMMIT, REVERT } from 'redux-optimistic-ui';
import { createAction } from 'redux-actions';

function createOptimisticAction(actionType, optimisticActionType, transactionID) {
  return createAction(
    actionType,
    payload => payload,
    () => ({
      optimistic: {
        type: optimisticActionType,
        transactionID,
      },
    }),
  );
}

export function createOptimisticBeginAction(actionType) {
  return createOptimisticAction(actionType, BEGIN, actionType);
}

export function createOptimisticCommitAction(actionType, actionTypeToCommit) {
  return createOptimisticAction(actionType, COMMIT, actionTypeToCommit);
}

export function createOptimisticRevertAction(actionType, actionTypeToRevert) {
  return createOptimisticAction(actionType, REVERT, actionTypeToRevert);
}
