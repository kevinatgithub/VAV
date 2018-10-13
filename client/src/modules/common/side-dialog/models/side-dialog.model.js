const sideDialog = {
  state: {
    isSideDialogOpen: false,
  },
  reducers: {
    showSideDialog(state, payload) {
      return {
        ...state,
        isSideDialogOpen: payload,
      };
    },
  },
};

export default sideDialog;
