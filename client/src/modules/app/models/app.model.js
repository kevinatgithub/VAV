import { Intent } from '@blueprintjs/core';
import toaster from 'core/utils/toaster';

const app = {
  state: {
    loading: false,
    showSidebar: true,
    showHeader: true,
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
