import api from 'core/utils/api';
import { Intent } from '@blueprintjs/core';
import { apiMethod } from '../../../core/utils/api';

const initialState = {
  bodyType: null,
  chassisModel: null,

  bodyTypes: [],
  isBodyTypesLoading: false,
  chassisModels: [],
  isChassisModelsLoading: false,
  isSaving: false,

  selectedTaktTime: null,

  error: null,
};

const taktTime = {
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
        bodyTypes: bodyTypes && bodyTypes.map(({ id, name }) => ({ value: id, label: name })),
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
    getChassisModelsSuccess(state, chassisModels) {
      return {
        ...state,
        chassisModels: chassisModels && chassisModels.map(({ id, name, type }) => ({ value: id, label: name, type })),
        isChassisModelsLoading: false,
      };
    },
    getChassisModelsFail(state) {
      return {
        ...state,
        isBodyTypesLoading: false,
      };
    },
    saveTaktTimeRequest(state) {
      return {
        ...state,
        isSaving: true,
      };
    },
    saveTaktTimeSuccess(state) {
      return {
        ...state,
        isSaving: false,
      };
    },
    saveTaktTimeFail(state) {
      return {
        ...state,
        isSaving: false,
      };
    },
    editTaktTime(state, selectedTaktTime) {
      return {
        ...state,
        selectedTaktTime,
      };
    },
    reset(state) {
      return {
        ...initialState,
        chassisModels: state.chassisModels,
      };
    },
  },
  effects: dispatch => ({
    async getBodyTypesRequest(typeId = 'all') {
      try {
        dispatch.sideDialog.setLoading(true);

        const result = await api({ endpoint: `bodyTypes/type/${typeId}?pageSize=100` });

        this.getBodyTypesSuccess(result.result);
      } catch (error) {
        this.getBodyTypesFail(error);
        dispatch.app.handleError({ error, message: 'Something went wrong while getting the Body Types.' });
      } finally {
        dispatch.sideDialog.setLoading(false);
      }
    },
    async getChassisModelsRequest() {
      try {
        dispatch.sideDialog.setLoading(true);

        const result = await api({ endpoint: 'chassisModels?pageSize=100' });

        this.getChassisModelsSuccess(result.result);
      } catch (error) {
        this.getChassisModelsFail(error);
        dispatch.app.handleError({ error, message: 'Something went wrong while getting the Chassis Models.' });
      } finally {
        dispatch.sideDialog.setLoading(false);
      }
    },
    async saveTaktTimeRequest(values, { sectionTaktTimes: { section }, taktTime: { selectedTaktTime } }) {
      try {
        dispatch.sideDialog.setLoading(true);

        const body = { ...values, sectionId: section.id };

        const method = selectedTaktTime ? apiMethod.PUT : apiMethod.POST;

        const result = await api({ endpoint: 'takttime', method, body: JSON.stringify(body) });

        dispatch.sideDialog.showSideDialog(false);

        dispatch.app.showToast({
          intent: Intent.SUCCESS,
          message: `Takt Time entry has been successfully ${selectedTaktTime ? 'updated' : 'added'}.`,
        });

        this.saveTaktTimeSuccess(result);

        this.reloadSectionTakTimes();
      } catch (error) {
        this.saveTaktTimeFail(error);
        dispatch.app.handleError({ error, message: 'Something went wrong while saving Takt Time entry.' });
      } finally {
        dispatch.sideDialog.setLoading(false);
        this.reset();
      }
    },
    async reloadSectionTakTimes(_, { sectionTaktTimes: { section } }) {
      await new Promise(res => setTimeout(res, 500));
      dispatch.sectionTaktTimes.getSectionTaktTimesRequest(section);
    },
    getChassisModelsSuccess(chassisModels, { taktTime: { selectedTaktTime } }) {
      if (selectedTaktTime) {
        const chassisModel = chassisModels.find(cm => cm.id === selectedTaktTime.chassisModelId);
        if (chassisModel) {
          this.getBodyTypesRequest(chassisModel.type);
        }
      }
    },
  }),
};

export default taktTime;

