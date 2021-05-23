import { useState, useCallback } from 'react';
import {
  parseConfigErrors,
  validateConfig,
  createEmbedConfigBasedOnEmbedType,
  validateBootrapConfig
} from '../utils/config';
import { Config } from '../types';
import { Embed } from 'embed';

declare type UseReport = [any, (ref: any, config: Config) => void];

declare type UseBootstrap = [any, (ref: any, config: Config) => void, (ref: any, config: Config) => void];

// powerbi object is global
// used inside Embed.jsx has more logic tied to props of Embed.
function _useReport(
  performOnEmbed: (report: any, reportRef?: any) => void
): UseReport {
  const [report, _setEmbedInstance] = useState<Embed | null>(null);

  const setEmbed = (embedDivRef: any, embedConfig: Config): void => {
    const errors = validateConfig(embedConfig);
    if (!errors || errors.length === 0) {
      embed(embedDivRef.current, embedConfig);
    } else {
      const errorString = parseConfigErrors(errors);
      throw new Error(errorString || 'invalid configuration passed');
    }
  };

  const embed = (ref: any, config: Config) => {
    const { reportMode } = config;
    const isCreateMode = reportMode === 'Create';
    let embedInstance;

    if (isCreateMode)
      embedInstance = window.powerbi.createReport(ref, config as any);
    else {
      embedInstance = window.powerbi.embed(ref, config as any);
    }

    if (performOnEmbed) {
      performOnEmbed(embedInstance, ref);
    }

    _setEmbedInstance(embedInstance);
  };

  return [report, setEmbed];
}

// cleaner and a default API to export
function useReport(): UseReport {
  const [report, _setEmbedInstance] = useState<Embed | null>(null);

  const embed = (ref: any, config: Config): void => {
    const embedConfig = createEmbedConfigBasedOnEmbedType(config);
    const errors = validateConfig(embedConfig);
    if (!errors || errors.length === 0) {
      const _embed = window.powerbi.embed(ref.current, embedConfig as any);
      const embedInstance = window.powerbi.get(ref.current);
      _setEmbedInstance(embedInstance);
    } else {
      const errorString = parseConfigErrors(errors);
      throw new Error(errorString || 'invalid configuration passed');
    }
  };

  return [report, embed];
}


function useBootstrap(): UseBootstrap {
  const [isBotstrapped, setIsBootstrapped] = useState<Boolean>(false);
  const [report, _setEmbedInstance] = useState<Embed | null>(null);

  const embed = (ref: any, config: Config): void => {
    if(isBotstrapped) {
      const embedConfig = createEmbedConfigBasedOnEmbedType(config);
      const errors = validateConfig(embedConfig);
      if (!errors || errors.length === 0) {
        const _embed = window.powerbi.embed(ref.current, embedConfig as any);
        const embedInstance = window.powerbi.get(ref.current);
        _setEmbedInstance(embedInstance);
      } else {
        const errorString = parseConfigErrors(errors);
        throw new Error(errorString || 'invalid configuration passed');
      }
    } else {
      throw new Error('bootstrap was not called');
    }
  };

  const bootstrap = (ref: any, config: Config) => {
    const bootstrapConfig = createEmbedConfigBasedOnEmbedType(config);
    if (validateBootrapConfig(bootstrapConfig)) {
      window.powerbi.bootstrap(ref.current, bootstrapConfig);
      setIsBootstrapped(true);
    } else {
      throw new Error('invalid configuration passed');
    }
  }

  return [report, bootstrap, embed];
}

export { _useReport, useReport, useBootstrap };
