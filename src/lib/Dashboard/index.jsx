import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Embed from '../common/Embed';
import { createDashboardConfig } from '../utils/config';
import { dashboardHandler } from '../common/onEmbedHandlers';
import { debounce, isEmptyObject } from '../utils';

const Dashboard = (props) => {
  const [currentConfig, setCurrentConfig] = useState({});

  const performOnEmbed = useCallback(
    (dashboard, dashboardRef) => {
      debounce(dashboardHandler(dashboard, dashboardRef, props), 250);
    },
    [props]
  );

  useEffect(() => {
    setCurrentConfig(createDashboardConfig(props));
  }, [props]);

  if (isEmptyObject(currentConfig)) {
    return <div> Error </div>;
  }

  return (
    <Embed
      config={currentConfig}
      performOnEmbed={performOnEmbed}
      style={props.style}
    />
  );
};

Dashboard.propTypes = {
  tokenType: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  embedId: PropTypes.string.isRequired,
  pageView: PropTypes.string,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  onTileClicked: PropTypes.func,
};

export default Dashboard;
