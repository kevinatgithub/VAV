import api from '../../utils/api';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
  id: null,
  preparingToProcess: false,
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
    reset() {
      return initialState;
    },
  },
  effects: ({ app }) => ({
    async getMoDetailsRequest(payload) {
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
    },
  }),
};

export default selectedMo;

