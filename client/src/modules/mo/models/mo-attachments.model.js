// import api from 'core/utils/api';
// import { Intent } from '@blueprintjs/core';
// import { apiMethod } from '../../../core/utils/api';

const initialState = {
  files: [],
  isUploading: false,
};

const MoAttachment = {
  state: initialState,
  reducers: {
    uploadFileRequest(state) {
      return {
        ...state,
        isUploading: true,
      };
    },
    uploadFileSuccess(state, file) {
      return {
        ...state,
        isUploading: false,
        files: [...state.files, file],
      };
    },
    deleteFileSuccess(state, fileName) {
      return {
        ...state,
        isUploading: false,
        files: [...state.files.filter(f => f.name !== fileName)],
      };
    },
    reset() {
      return initialState;
    },
  },
  effects: ({ app }) => ({
    async uploadFileRequest(file) {
      try {
        app.setLoading(true);

        // const result = await api({ endpoint: 'mo', method: apiMethod.PUT, body: JSON.stringify(file) });
        const result = await new Promise(res => setTimeout(() => res(file), 1000));

        this.uploadFileSuccess(result);

        app.setLoading(false);
      } catch (error) {
        this.uploadFileFail(error);
        app.handleError({ error, message: 'Something went wrong while uploading attachment.' });
      }
    },
    async deleteFileRequest(fileName) {
      try {
        app.setLoading(true);

        // const result = await api({ endpoint: 'mo', method: apiMethod.PUT, body: JSON.stringify(payload) });
        const result = await new Promise(res => setTimeout(() => res(fileName), 1000));

        this.deleteFileSuccess(result);

        app.setLoading(false);
      } catch (error) {
        this.deleteFileFail(error);
        app.handleError({ error, message: 'Something went wrong while deleting attachment.' });
      }
    },
  }),
};

export default MoAttachment;
