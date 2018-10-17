import api from 'core/utils/api';
import { Intent } from '@blueprintjs/core';
import { apiMethod } from '../../../core/utils/api';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  id: null,
  preparingToProcess: false,
  isProcessing: false,
};

const selectedMo = {
  state: initialState,
  reducers: {
    unselectMo(state) {
      return {
        ...state,
        data: null,
        id: null,
        preparingToProcess: false,
      };
    },
    setPreparingToProcess(state, payload) {
      return {
        ...state,
        preparingToProcess: payload,
      };
    },
    setId(state, payload) {
      return {
        ...state,
        id: payload,
      };
    },
    getMoDetailsSuccess(state, payload) {
      return {
        ...state,
        data: payload,
      };
    },
    getMoDetailsFail(state, payload) {
      return {
        ...state,
        error: payload,
        isProcessing: false,
      };
    },
    processMoRequest(state) {
      return {
        ...state,
        isProcessing: true,
      };
    },
    processMoSuccess(state, payload) {
      return {
        ...state,
        isProcessing: false,
        preparingToProcess: false,
        data: payload,
      };
    },
    processMoFail(state, payload) {
      return {
        ...state,
        error: payload,
        isProcessing: false,
      };
    },
    reset() {
      return initialState;
    },
  },
  effects: ({ app }) => ({
    async getMoDetailsRequest(payload) {
      try {
        app.setLoading(true);

        this.unselectMo();

        this.setId(payload.id);

        const result = await api({ endpoint: `mo/${payload.id}` });

        const formattedResult = {
          ...result,
          date: new Date(result.date).toLocaleDateString(),
          status: result.status && result.status.trim(),
          chassisArrivalDate: new Date(result.chassisArrivalDate).toLocaleDateString(),
        };

        this.getMoDetailsSuccess(formattedResult);

        app.setLoading(false);
      } catch (error) {
        this.getMoDetailsFail(error);
        app.handleError({ error, message: 'Something went wrong while getting the MO details.' });
      }
    },
    async processMoRequest(payload) {
      try {
        app.setLoading(true);

        const result = await api({ endpoint: 'mo', method: apiMethod.PUT, body: JSON.stringify(payload) });

        this.processMoSuccess(result.data);

        app.setLoading(false);

        app.showToast({
          intent: Intent.SUCCESS,
          message: 'Chassis numbers had been printed and now ready to be released to production.',
        });
      } catch (error) {
        this.processMoFail(error);
        app.handleError({ error, message: 'Something went wrong during the processing of MO.' });
      }
    },
  }),
};

export default selectedMo;
