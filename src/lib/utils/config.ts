import { models } from 'powerbi-client';
import { clean, isEmptyObject } from './index';
import * as pbi from 'powerbi-client';
import {
  ReportProps,
  DashboardProps,
  TileProps,
  IError,
  Config,
} from '../types';

const createReportConfig = (props: ReportProps): Config => {
  const {
    tokenType,
    accessToken,
    embedUrl,
    embedId,
    permissions,
    pageName,
    extraSettings,
    datasetId,
    reportMode,
    groupId
  } = props;

  if (reportMode === 'create') {
    return clean({
      type: 'report',
      tokenType: models.TokenType[tokenType],
      accessToken,
      embedUrl,
      datasetId,
      groupId,
      reportMode,
    });
  }

  const cleanSettings = clean({
    filterPaneEnabled: true,
    navContentPaneEnabled: true,
    ...extraSettings,
  });

  const cleanDataSetBinding = clean({
    datasetId: datasetId,
  });

  const settings = isEmptyObject(cleanSettings)
    ? {}
    : {
        settings: cleanSettings,
      };

  const datasetBinding = isEmptyObject(cleanDataSetBinding)
    ? {}
    : {
        datasetBinding: cleanDataSetBinding,
      };

  return clean({
    type: 'report',
    tokenType: models.TokenType[tokenType],
    accessToken,
    embedUrl,
    id: embedId,
    pageName,
    permissions: models.Permissions[permissions],
    reportMode,
    ...settings,
    ...datasetBinding,
  });
};

const createDashboardConfig = (props: DashboardProps): Config => {
  const { tokenType, accessToken, embedUrl, pageView, embedId } = props;

  return clean({
    type: 'dashboard',
    tokenType: models.TokenType[tokenType],
    accessToken,
    embedUrl,
    id: embedId,
    pageView,
  });
};

const createTileConfig = (props: TileProps): Config => {
  const {
    tokenType,
    accessToken,
    embedUrl,
    embedId,
    dashboardId,
  } = props;

  return clean({
    type: 'tile',
    tokenType: models.TokenType[tokenType],
    accessToken,
    embedUrl,
    id: embedId,
    dashboardId,
  });
};

const validateTypeConfig = (config: any): IError[] => {
  switch (config.type) {
    case 'report':
      return pbi.models.validateReportLoad(config);
    case 'dashboard':
      return pbi.models.validateDashboardLoad(config);
    case 'tile':
      return pbi.models.validateTileLoad(config);
    default:
      throw Error(
        'Unknown config type allowed types are report, dashboard or tile'
      );
  }
};

const validateCreateReportConfig = (config: any): IError[] => {
  if (!config.embedUrl) throw Error('Embed URL is required');
  return pbi.models.validateCreateReport(config);
};

const validateConfig = (config: any): IError[] => {
  const isCreateMode = config.reportMode === 'create';
  return isCreateMode
    ? validateCreateReportConfig(config)
    : validateTypeConfig(config);
};

const createEmbedConfigBasedOnEmbedType = (config: any): Config => {
  const { embedType } = config;
  switch (embedType) {
    case 'report':
      return createReportConfig(config);
    case 'dashboard':
      return createDashboardConfig(config);
    case 'tile':
      return createTileConfig(config);
    default:
      throw Error('Wrong embed type!');
  }
};

const parseConfigErrors = (errors: IError[]): string => {
  let parsedError = '';
  if (Array.isArray(errors) && errors.length) {
    parsedError = errors
      .map((error) => error.detailedMessage || error.message || '')
      .filter((x) => x)
      .join(', ');
  }
  return parsedError;
};

export {
  validateConfig,
  createReportConfig,
  createDashboardConfig,
  createTileConfig,
  createEmbedConfigBasedOnEmbedType,
  parseConfigErrors,
};
