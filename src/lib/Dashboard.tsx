import * as React from 'react';
import Embed from './Embed';
import { createDashboardConfig } from './utils/config';
import { dashboardHandler } from './utils/onEmbedHandlers';
import { Config, DashboardProps } from './types';

const Dashboard = (props: DashboardProps) => {
  const [currentConfig, setCurrentConfig] = React.useState<Config | null>(null);

  const performOnEmbed = React.useCallback(
    (dashboard, dashboardRef) => {
      dashboardHandler(dashboard, dashboardRef, props);
    },
    [props]
  );

  React.useEffect(() => {
    setCurrentConfig(createDashboardConfig(props));
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

export default Dashboard;
