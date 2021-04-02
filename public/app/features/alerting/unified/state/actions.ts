import { createAsyncThunk } from '@reduxjs/toolkit';
import { AlertManagerCortexConfig } from 'app/plugins/datasource/alertmanager/types';
import { ThunkResult } from 'app/types';
import { RuleNamespace } from 'app/types/unified-alerting';
import { fetchRules } from '../api/prometheus';
import { fetchAlertManagerConfig } from '../api/alertmanager';
import { getRulesDataSources, GRAFANA_RULES_SOURCE_NAME } from '../utils/datasource';
import { withSerializedError } from '../utils/redux';

/*
 * Will need to be updated to:
 *
 * 1. Fetch grafana managed rules when the endpoint becomes available
 * 2. Reconcile with rules from the ruler where ruler is available
 */

export const fetchRulesAction = createAsyncThunk(
  'unifiedalerting/fetchRules',
  (rulesSourceName: string): Promise<RuleNamespace[]> => withSerializedError(fetchRules(rulesSourceName))
);

export const fetchAlertManagerConfigAction = createAsyncThunk(
  'unifiedalerting/fetchAmConfig',
  (alertManagerSourceName: string): Promise<AlertManagerCortexConfig> =>
    withSerializedError(fetchAlertManagerConfig(alertManagerSourceName))
);

export const fetchRulesFromAllSourcesAction = (): ThunkResult<void> => {
  return async (dispatch) => {
    getRulesDataSources().forEach((ds) => dispatch(fetchRulesAction(ds.name)));
    dispatch(fetchRulesAction(GRAFANA_RULES_SOURCE_NAME));
  };
};