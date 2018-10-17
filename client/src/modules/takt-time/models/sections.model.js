import api from 'core/utils/api';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const mos = {
  state: initialState,
  reducers: {
    getSectionsSuccess(state, payload) {
      return {
        ...state,
        data: payload,
      };
    },
  },
  effects: dispatch => ({
    async getSectionsRequest() {
      try {
        dispatch.app.setLoading(true);

        const result = await api({ endpoint: 'sections' });

        this.getSectionsSuccess(result.result);

        if (result.result.length) {
          const [firstSection] = result.result;
          dispatch.sectionTaktTimes.getSectionTaktTimesRequest(firstSection);
        }

        dispatch.app.setLoading(false);
      } catch (error) {
        dispatch.app.handleError({ error, message: 'Something went wrong while getting the Taktime.' });
      }
    },
  }),
};

export default mos;

