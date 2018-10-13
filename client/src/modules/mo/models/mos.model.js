import api from 'core/utils/api';

const initialState = {
  data: null,
  isLoading: false,
  error: null,

  statusFilter: '',
  searchTerm: '',
};

const mos = {
  state: initialState,
  reducers: {
    getMosSuccess(state, payload) {
      return {
        ...state,
        data: payload,
      };
    },
    setStatusFilter(state, payload) {
      return {
        ...state,
        statusFilter: payload,
      };
    },
    setSearchTerm(state, payload) {
      return {
        ...state,
        searchTerm: payload,
      };
    },
    clearResult(state) {
      return {
        ...state,
        data: { page: 1, totalPages: 1, result: [] },
      };
    },
    reset() {
      return initialState;
    },
  },
  effects: ({ app }) => ({
    async getMosRequest(payload, { mos: { statusFilter, searchTerm } }) { // payload = pageNumber
      app.setLoading(true);

      const pageSize = (payload || 1) * 10;

      const qs = encodeURI(
        `pageSize=${pageSize}${searchTerm ? `&keyWord=${searchTerm}` : ''}${
          statusFilter ? `&status=${statusFilter}` : ''
        }&pageNo=1`,
      );

      const result = await api({ endpoint: `mos?${qs}` });

      const formattedResult = result && {
        ...result,
        result: result.result.map(r => ({
          ...r,
          date: new Date(r.date).toLocaleDateString(),
          status: r.status && r.status.trim(),
          chassisHit: ['12345', '43245'],
        })),
      };

      this.getMosSuccess(formattedResult);

      app.setLoading(false);
    },
    searchMo(payload) {
      this.clearResult();
      this.setSearchTerm(payload);
      this.getMosRequest(payload);
    },
    filterByStatus(payload) {
      this.clearResult();
      this.setStatusFilter(payload);
      this.getMosRequest(1);
    },
  }),
};

export default mos;

