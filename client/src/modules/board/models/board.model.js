// import api from 'core/utils/api';

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const boars = {
  state: initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  effects: () => ({
  }),
};

export default boars;

