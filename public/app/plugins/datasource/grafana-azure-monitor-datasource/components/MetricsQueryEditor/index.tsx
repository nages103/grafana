import React from 'react';

import Datasource from '../../datasource';
import { AzureMonitorQuery, Option } from '../../types';
import { useMetricsMetadata } from '../metrics';
import SubscriptionField from '../SubscriptionField';
import MetricNamespaceField from './MetricNamespaceField';
import NamespaceField from './NamespaceField';
import ResourceGroupsField from './ResourceGroupsField';
import ResourceNameField from './ResourceNameField';
import MetricNameField from './MetricNameField';
import AggregationField from './AggregationField';
import TimeGrainField from './TimeGrainField';
import DimensionFields from './DimensionFields';
import TopField from './TopField';
import LegendFormatField from './LegendFormatField';

interface MetricsQueryEditorProps {
  query: AzureMonitorQuery;
  datasource: Datasource;
  subscriptionId: string;
  onChange: (newQuery: AzureMonitorQuery) => void;
  variableOptionGroup: { label: string; options: Option[] };
}

const MetricsQueryEditor: React.FC<MetricsQueryEditorProps> = ({
  query,
  datasource,
  subscriptionId,
  variableOptionGroup,
  onChange,
}) => {
  const metricsMetadata = useMetricsMetadata(datasource, query, subscriptionId, onChange);

  return (
    <div data-testid="azure-monitor-metrics-query-editor">
      <SubscriptionField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
      />

      <ResourceGroupsField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
      />

      <NamespaceField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
      />

      <ResourceNameField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
      />

      {/* TODO: Can we hide this field if there's only one option, and its the same as the namespace? */}
      <MetricNamespaceField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
      />

      <MetricNameField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
      />

      <AggregationField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
        aggregationOptions={metricsMetadata?.aggOptions ?? []}
      />

      <TimeGrainField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
        timeGrainOptions={metricsMetadata?.timeGrains ?? []}
      />

      <DimensionFields
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
        dimensionOptions={metricsMetadata?.dimensions ?? []}
      />

      <TopField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
      />

      <LegendFormatField
        query={query}
        datasource={datasource}
        subscriptionId={subscriptionId}
        variableOptionGroup={variableOptionGroup}
        onQueryChange={onChange}
      />
    </div>
  );
};

export default MetricsQueryEditor;
