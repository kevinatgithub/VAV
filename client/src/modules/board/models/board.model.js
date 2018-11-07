import api from 'core/utils/api';

const initialState = {
  sectionsDictionary: {},
  isLoading: false,
  error: null,
};

const board = {
  state: initialState,
  reducers: {
    getUnitsInSectionSuccess(state, payload) {
      return {
        ...state,
        sectionsDictionary: {
          ...state.sectionsDictionary,
          [payload.sectionId]: payload.wipChassisNumbers,
        },
      };
    },
    reset() {
      return initialState;
    },
  },
  effects: ({ app }) => ({
    async getDashboardRequest() {
      await Promise.all([
        this.getUnitsInSectionRequest(1),
        this.getUnitsInSectionRequest(2),
        this.getUnitsInSectionRequest(3),
        this.getUnitsInSectionRequest(4),
        this.getUnitsInSectionRequest(5),
        this.getUnitsInSectionRequest(6),
        this.getUnitsInSectionRequest(7),
        this.getUnitsInSectionRequest(8),
      ]);
    },
    async getUnitsInSectionRequest(sectionId) {
      try {
        const result = await api({ endpoint: `/dashboard/${sectionId}` });
        this.getUnitsInSectionSuccess(result);
      } catch (error) {
        app.handleError({ error, message: 'Something went wrong while getting units in section.' });
      }
    },
  }),
};

export default board;

