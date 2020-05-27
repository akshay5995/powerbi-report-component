import { useState } from 'react';
import { parseConfigErrors, validateConfig, createEmbedConfigBasedOnEmbedType } from '../utils/config';

// powerbi object is global
// used inside Embed.jsx has more logic tied to props of Embed.
function _useReport(performOnEmbed = null) {
  const [report, _setEmbedInstance] = useState(null);

  const setEmbed = (embedDivRef, embedConfig) => {
    const errors = validateConfig(embedConfig);
    if (!errors) {
      embed(embedDivRef.current, embedConfig);
    } else {
      const errorString = parseConfigErrors(errors);
      throw new Error(errorString || 'invalid configuration passed');
    }
  };

  const embed = (ref, config) => {
    const { reportMode } = config;
    const isCreateMode = reportMode === 'create';
    let embedInstance;

    if (isCreateMode) embedInstance = powerbi.createReport(ref, config);
    else {
      embedInstance = powerbi.embed(ref, config);
    }

    if (performOnEmbed) {
      performOnEmbed(embedInstance, ref);
    }

    _setEmbedInstance(embedInstance);
  };

  return [report, setEmbed];
}

// cleaner and a default API to export
function useReport() {
  const [report, _setEmbedInstance] = useState(null);

  const setEmbed = (ref, config) => {
    const embedConfig = createEmbedConfigBasedOnEmbedType(config);
    const errors = validateConfig(embedConfig);
    if (!errors) {
      embed(ref.current, embedConfig);
    } else {
      const errorString = parseConfigErrors(errors);
      throw new Error(errorString || 'invalid configuration passed');
    }
  };

  const embed = (ref, config) => {
    const embedInstance = powerbi.embed(ref, config);
    _setEmbedInstance(embedInstance);
  };

  return [report, setEmbed];
}

export { _useReport, useReport };
