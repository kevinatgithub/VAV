import api from 'core/utils/api';

const initialState = {
  data: null,
  isLoading: false,
  section: null,
};

const sectionTaktimes = {
  state: initialState,
  reducers: {
    getSectionTaktimesRequest(state, section) {
      return {
        ...state,
        isLoading: true,
        section,
      };
    },
    getSectionTaktimesSuccess(state, data) {
      return {
        ...state,
        isLoading: false,
        data,
      };
    },
    getSectionTaktimesFail(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    reset() {
      return initialState;
    },
  },
  effects: ({ app }) => ({
    async getSectionTaktimesRequest(section) {
      try {
        app.setLoading(true);

        const result = await api({ endpoint: `takttimes/section/${section.id}` });

        this.getSectionTaktimesSuccess(result.result);

        app.setLoading(false);
      } catch (error) {
        this.getSectionTaktimesFail(error);
        app.handleError({ error, message: 'Something went wrong while getting the Taktimes.' });
      }
    },
  }),
};

export default sectionTaktimes;
