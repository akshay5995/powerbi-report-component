import * as React from 'react';
import Embed from './Embed';
import { createReportVisualConfig } from './utils/config';
import { reportVisualHandler } from './utils/onEmbedHandlers';
import { Config, ReportVisualProps } from './types';

const ReportVisual = (props: ReportVisualProps) => {
  const [
    currentConfig,
    setCurrentConfig,
  ] = React.useState<Config | null>(null);

  const performOnEmbed = React.useCallback(
    (report, reportRef) => {
      reportVisualHandler(report, reportRef, props);
    },
    [props]
  );

  React.useEffect(() => {
    setCurrentConfig(createReportVisualConfig(props));
  }, [props]);

  if (!currentConfig) {
    return <div>Error!</div>;
  }

  return (
    <Embed
      config={currentConfig}
      performOnEmbed={performOnEmbed}
      style={props.style}
    />
  );
};

export default ReportVisual;
