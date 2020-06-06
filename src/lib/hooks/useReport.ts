import { useState } from 'react';
import {
  parseConfigErrors,
  validateConfig,
  createEmbedConfigBasedOnEmbedType,
} from '../utils/config';
import { Config } from '../types';

declare type UseReport = [any, (ref: any, config: Config) => void];

// powerbi object is global
// used inside Embed.jsx has more logic tied to props of Embed.
function _useReport(
  performOnEmbed: (report: any, reportRef?: any) => void
): UseReport {
  const [report, _setEmbedInstance] = useState(null);

  const setEmbed = (embedDivRef: any, embedConfig: Config): void => {
    const errors = validateConfig(embedConfig);
    if (!errors) {
      embed(embedDivRef.current, embedConfig);
    } else {
      const errorString = parseConfigErrors(errors);
      throw new Error(errorString || 'invalid configuration passed');
    }
  };

  const embed = (ref: any, config: Config) => {
    const { reportMode } = config;
    const isCreateMode = reportMode === 'create';
    let embedInstance;

    if (isCreateMode)
      embedInstance = window.powerbi.createReport(ref, config as any);
    else {
      embedInstance = window.powerbi.embed(ref, config as any);
    }

    if (performOnEmbed) {
      performOnEmbed(embedInstance, ref);
    }

    _setEmbedInstance(embedInstance as any);
  };

  return [report, setEmbed];
}

// cleaner and a default API to export
function useReport(): UseReport {
  const [report, _setEmbedInstance] = useState(null);

  const setEmbed = (ref: any, config: Config): void => {
    const embedConfig = createEmbedConfigBasedOnEmbedType(config);
    const errors = validateConfig(embedConfig);
    if (!errors) {
      embed(ref.current, embedConfig);
    } else {
      const errorString = parseConfigErrors(errors);
      throw new Error(errorString || 'invalid configuration passed');
    }
  };

  const embed = (ref: any, config: Config) => {
    const _embed = window.powerbi.embed(ref, config as any);
    const embedInstance = window.powerbi.get(ref);
    _setEmbedInstance(embedInstance as any);
  };

  return [report, setEmbed];
}

export { _useReport, useReport };
