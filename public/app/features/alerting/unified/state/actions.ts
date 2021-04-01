import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkResult } from 'app/types';
import { RuleNamespace } from 'app/types/unified-alerting';
import { RulerRulesConfigDTO } from 'app/types/unified-alerting-dto';
import { fetchRules } from '../api/prometheus';
import { fetchRulerRules } from '../api/ruler';
import { getAllRulesSourceNames } from '../utils/datasource';
import { withSerializedError } from '../utils/redux';

export const fetchPromRulesAction = createAsyncThunk(
  'unifiedalerting/fetchPromRules',
  (rulesSourceName: string): Promise<RuleNamespace[]> => withSerializedError(fetchRules(rulesSourceName))
);

export const fetchRulerRulesAction = createAsyncThunk(
  'unifiedalerting/fetchRulerRules',
  (rulesSourceName: string): Promise<RulerRulesConfigDTO | null> => {
    return withSerializedError(fetchRulerRules(rulesSourceName));
  }
);

export function fetchAllPromAndRulerRules(force = false): ThunkResult<void> {
  return (dispatch, getStore) => {
    const { promRules, rulerRules } = getStore().unifiedAlerting;
    getAllRulesSourceNames().map((name) => {
      if (force || !promRules[name]?.loading) {
        dispatch(fetchPromRulesAction(name));
      }
      if (force || !rulerRules[name]?.loading) {
        dispatch(fetchRulerRulesAction(name));
      }
    });
  };
}
