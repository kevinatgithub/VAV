import { Intent } from '@blueprintjs/core';
import toaster from 'core/utils/toaster';
import { errorTypes } from '../../../core/utils/values';

const app = {
  state: {
    loading: false,
    showSidebar: true,
    showHeader: true,
    showErrorAlert: false,
    error: null,
  },
  reducers: {
    setLoading(state, payload) {
      return {
        ...state,
        loading: payload,
      };
    },
    setShowSidebar(state, payload) {
      return {
        ...state,
        showSidebar: payload,
      };
    },
    setShowHeader(state, payload) {
      return {
        ...state,
        showHeader: payload,
      };
    },
    disposeError(state) {
      return {
        ...state,
        showErrorAlert: false,
        error: null,
      };
    },
    handleError(state, payload) {
      const error = {
        type: payload.error.message === 'Network Error' ? errorTypes.NETWORK : errorTypes.GENERAL,
        message: payload.message,
      };
      return {
        ...state,
        showErrorAlert: true,
        loading: false,
        error,
      };
    },
  },
  effects: () => ({
    async showToast(payload) {
      const { intent, message } = payload;
      const icon = {
        [Intent.PRIMARY]: 'info-sign',
        [Intent.SUCCESS]: 'tick-circle',
        [Intent.DANGER]: 'error',
        [Intent.WARNING]: 'warning-sign',
        [Intent.WARNING]: 'warning-sign',
      }[intent];

      await toaster.dismiss();

      await toaster.show({
        intent,
        icon,
        message,
        timeout: 4000,
      });
    },
  }),
};

export default app;
