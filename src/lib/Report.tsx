import * as React from 'react';
import Embed from './Embed';
import { createReportConfig } from './utils/config';
import { reportHandler } from './utils/onEmbedHandlers';
import { Config, ReportProps } from './types';

const Report = (props: ReportProps) => {
  const [currentConfig, setCurrentConfig] = React.useState<Config | null>(null);

  const performOnEmbed = React.useCallback(
    (report) => {
      reportHandler(report, props);
    },
    [props]
  );

  React.useEffect(() => {
    setCurrentConfig(createReportConfig(props));
  }, [props]);

  if (!currentConfig) {
    return (<div>Error!</div>)
  }

  return (
    <Embed
      config={currentConfig}
      performOnEmbed={performOnEmbed}
      style={props.style}
    />
  );
};

export default Report;
