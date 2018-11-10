import api from 'core/utils/api';
import { HubConnectionBuilder } from '@aspnet/signalr';

const connection = new HubConnectionBuilder().withUrl('https://dev-vav.azurewebsites.net/dashboard').build();

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
    getDashboardRequestSuccess(state, payload) {
      return {
        ...state,
        sectionsDictionary: payload.reduce((acc, curr) => ({ ...acc, [curr.sectionId]: curr.wipChassisNumbers }), {}),
      };
    },
    reset() {
      return initialState;
    },
  },
  effects: ({ app }) => ({
    async getDashboardRequest() {
      try {
        const result = await api({ endpoint: 'dashboard' });
        this.getDashboardRequestSuccess(result);
        this.startRealtimeUpdate();
      } catch (error) {
        app.handleError({ error, message: 'Something went wrong while getting dashboard data' });
      }
    },
    async getUnitsInSectionRequest(sectionId) {
      try {
        const result = await api({ endpoint: `/dashboard/${sectionId}` });
        this.getUnitsInSectionSuccess(result);
      } catch (error) {
        app.handleError({ error, message: 'Something went wrong while getting units in section.' });
      }
    },
    async startRealtimeUpdate() {
      try {
        await connection.start();
        connection.on('sectionMessage', (payload) => {
          this.getUnitsInSectionRequest(payload.sectionId);
        });
      } catch (error) {
        app.handleError({ error, message: 'Couldn\'t initiate dashboard realtime update' });
      }
    },
    async stopRealtimeUpdate() {
      try {
        await connection.stop();
        connection.off('sectionMessage');
      } catch (error) {
        app.handleError({ error, message: 'Couldn\'t stop dashboard realtime update' });
      }
    },
  }),
};

export default board;

