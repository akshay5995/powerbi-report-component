import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { validateConfig } from './common/config';

// powerbi object is global
const Embed = ({ config, performOnEmbed, style }) => {
  const { id } = config;
  const reportEl = useRef(null);

  const embed = useCallback(
    (config) => {
      let embedInstance;
      if (config.reportMode === 'create')
        embedInstance = powerbi.createReport(reportEl.current, config);
      else {
        embedInstance = powerbi.embed(reportEl.current, config);
      }
      if (performOnEmbed) {
        performOnEmbed(embedInstance, reportEl.current);
      }
    },
    [config]
  );

  useEffect(() => {
    const errors = validateConfig(config);
    if (!errors) {
      embed({ ...config });
    } else {
      throw new Error('invalid configuration passed');
    }
  }, [config]);

  return (
    <div className="report" style={style} ref={reportEl} id={id} />
  );
};

Embed.propTypes = {
  config: PropTypes.object.isRequired,
  performOnEmbed: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Embed;
