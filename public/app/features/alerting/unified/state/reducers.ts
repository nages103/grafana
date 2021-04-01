import { combineReducers } from 'redux';
import { createAsyncMapSlice } from '../utils/redux';
import { fetchPromRulesAction, fetchRulerRulesAction } from './actions';

export const reducer = combineReducers({
  promRules: createAsyncMapSlice('promRules', fetchPromRulesAction, (dataSourceName) => dataSourceName).reducer,
  rulerRules: createAsyncMapSlice('rulerRules', fetchRulerRulesAction, (dataSourceName) => dataSourceName).reducer,
});

export type UnifiedAlertingState = ReturnType<typeof reducer>;

export default reducer;
