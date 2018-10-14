import api from 'core/utils/api';

const initialState = {
  bodyType: null,
  chassisModel: null,

  bodyTypes: [],
  isBodyTypesLoading: false,
  chassisModels: [],
  isChassisModelsLoading: false,

  error: null,
};

const taktime = {
  state: initialState,
  reducers: {
    getBodyTypesRequest(state) {
      return {
        ...state,
        isBodyTypesLoading: true,
      };
    },
    getBodyTypesSuccess(state, bodyTypes) {
      return {
        ...state,
        bodyTypes,
        isBodyTypesLoading: false,
      };
    },
    getBodyTypesFail(state) {
      return {
        ...state,
        isBodyTypesLoading: false,
      };
    },
    getChassisModelsRequest(state) {
      return {
        ...state,
        isChassisModelsLoading: true,
      };
    },
    getChassisModelsSuccess(state, bodyTypes) {
      return {
        ...state,
        bodyTypes,
        isChassisModelsLoading: false,
      };
    },
    getChassisModelsFail(state) {
      return {
        ...state,
        isBodyTypesLoading: false,
      };
    },
  },
  effects: dispatch => ({
    async getBodyTypesRequest(typeId) {
      try {
        dispatch.app.setLoading(true);

        const result = await api({ endpoint: `bodyTypes/type/${typeId}` });

        this.getBodyTypesSuccess(result.result);

        dispatch.app.setLoading(false);
      } catch (error) {
        this.getBodyTypesFail(error);
        dispatch.app.handleError({ error, message: 'Something went wrong while getting the Body Types.' });
      }
    },
    async getChassisModelsRequest() {
      try {
        dispatch.app.setLoading(true);

        const result = await api({ endpoint: 'chassisModels' });

        this.getChassisModelsSuccess(result.result);

        dispatch.app.setLoading(false);
      } catch (error) {
        this.getChassisModelsFail(error);
        dispatch.app.handleError({ error, message: 'Something went wrong while getting the Chassis Models.' });
      }
    },
  }),
};

export default taktime;

