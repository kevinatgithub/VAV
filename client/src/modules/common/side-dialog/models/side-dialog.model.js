const sideDialog = {
  state: {
    isSideDialogOpen: false,
    isLoading: false,
  },
  reducers: {
    showSideDialog(state, payload) {
      return {
        ...state,
        isSideDialogOpen: payload,
      };
    },
    setLoading(state, payload) {
      return {
        ...state,
        isLoading: payload,
      };
    },
  },
};

export default sideDialog;
