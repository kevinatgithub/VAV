import { Intent } from '@blueprintjs/core';
import api from 'core/utils/api';
import { apiMethod } from '../../../core/utils/api';

const initialState = {
  data: null,
  isLoading: false,
  section: null,
};

const sectionTaktTimes = {
  state: initialState,
  reducers: {
    getSectionTaktTimesRequest(state, section) {
      return {
        ...state,
        isLoading: true,
        section,
      };
    },
    getSectionTaktTimesSuccess(state, data) {
      return {
        ...state,
        isLoading: false,
        data,
      };
    },
    getSectionTaktTimesFail(state) {
      return {
        ...state,
        isLoading: false,
      };
    },
    deleteTaktTimeSuccess(state, taktime) {
      return {
        ...state,
        data: state.data.filter(d => d.id !== taktime.id),
      };
    },
    reset() {
      return initialState;
    },
  },
  effects: ({ app }) => ({
    async getSectionTaktTimesRequest(section) {
      try {
        app.setLoading(true);

        const result = await api({ endpoint: `takttimes/section/${section.id}` });

        this.getSectionTaktTimesSuccess(result.result);

        app.setLoading(false);
      } catch (error) {
        this.getSectionTaktTimesFail(error);
        app.handleError({ error, message: 'Something went wrong while getting the Taktimes.' });
      }
    },
    async deleteTaktTimeRequest(taktTime) {
      try {
        app.setLoading(true);

        await api({ endpoint: `takttime/${taktTime.id}`, method: apiMethod.DELETE });

        app.showToast({
          intent: Intent.SUCCESS,
          message: 'Takt Time has been successfully deleted.',
        });

        this.deleteTaktTimeSuccess(taktTime);
      } catch (error) {
        this.deleteTaktTimeFail(error);
        app.handleError({ error, message: 'Something went wrong while deleting Takt Time.' });
      } finally {
        app.setLoading(false);
      }
    },
  }),
};

export default sectionTaktTimes;
