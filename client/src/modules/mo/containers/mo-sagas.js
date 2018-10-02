import { call, put, takeLatest } from 'redux-saga/effects';
import { getMosSuccess, getMosFail, getMoDetailsSuccess, getMoDetailsFail } from './mo-actions';
import { GET_MOS_REQUEST, GET_MO_DETAILS_REQUEST, FILTER_BY_STATUS, SEARCH_MO } from './mo-action-types';
import { showAppLoading } from '../../app/containers/app-actions';
import api from '../../utils/api';

function* getMos({ payload: { statusFilter, pageNo, searchTerm } }) {
  try {
    yield put(showAppLoading(true));

    const pageSize = (pageNo || 1) * 10;

    const qs = encodeURI(
      `pageSize=${pageSize}${searchTerm ? `&keyWord=${searchTerm}` : ''}${
        statusFilter ? `&status=${statusFilter}` : ''
      }&pageNo=1`,
    );

    const result = yield call(api, { endpoint: `mos?${qs}` });

    const formattedResult = result && {
      ...result,
      result: result.result.map(r => ({
        ...r,
        date: new Date(r.date).toLocaleDateString(),
        status: r.status && r.status.trim(),
      })),
    };

    yield put(getMosSuccess(formattedResult));
  } catch (error) {
    yield put(getMosFail(error));
  } finally {
    yield put(showAppLoading(false));
  }
}

function* getMoDetails({ payload }) {
  try {
    yield put(showAppLoading(true));

    const result = yield call(api, { endpoint: `mo/${payload}` });

    yield put(
      getMoDetailsSuccess({
        ...result,
        date: new Date(result.date).toLocaleDateString(),
        status: result.status && result.status.trim(),
        chassisArrivalDate: new Date(result.chassisArrivalDate).toLocaleDateString(),
      }),
    );
  } catch (error) {
    yield put(getMoDetailsFail(error));
  } finally {
    yield put(showAppLoading(false));
  }
}

export default [
  takeLatest([GET_MOS_REQUEST, FILTER_BY_STATUS, SEARCH_MO], getMos),
  takeLatest(GET_MO_DETAILS_REQUEST, getMoDetails),
];
