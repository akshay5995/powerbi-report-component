import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Embed from '../common/Embed';
import { createReportConfig } from '../utils/config';
import { reportHandler } from '../common/onEmbedHandlers';
import { debounce, isEmptyObject } from '../utils';

const Report = (props) => {
  const [currentConfig, setCurrentConfig] = useState({});

  const performOnEmbed = useCallback(
    (report) => {
      debounce(reportHandler(report, props), 250);
    },
    [props]
  );

  useEffect(() => {
    setCurrentConfig(createReportConfig(props));
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

Report.propTypes = {
  tokenType: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  embedId: PropTypes.string,
  pageName: PropTypes.string,
  extraSettings: PropTypes.object,
  permissions: PropTypes.string,
  style: PropTypes.object,
  reportMode: PropTypes.string,
  datasetId: PropTypes.string,
  onLoad: PropTypes.func,
  onRender: PropTypes.func,
  onError: PropTypes.func,
  onButtonClicked: PropTypes.func,
  onSelectData: PropTypes.func,
  onPageChange: PropTypes.func,
  onCommandTriggered: PropTypes.func,
};

export default Report;
