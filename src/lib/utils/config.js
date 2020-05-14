import { models } from 'powerbi-client';
import { clean, isEmptyObject } from '.';
import pbi from 'powerbi-client';

const createReportConfig = (props) => {
  if (props) {
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
    } = props;

    if (reportMode === 'create') {
      return clean({
        type: 'report',
        tokenType: models.TokenType[tokenType],
        accessToken,
        embedUrl,
        datasetId,
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
  }

  return null;
};

const createDashboardConfig = (props) => {
  if (props) {
    const {
      tokenType,
      accessToken,
      embedUrl,
      pageView,
      embedId,
    } = props;

    return clean({
      type: 'dashboard',
      tokenType: models.TokenType[tokenType],
      accessToken,
      embedUrl,
      id: embedId,
      pageView,
    });
  }
  return null;
};

const createTileConfig = (props) => {
  if (props) {
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
  }
  return null;
};

const validateTypeConfig = (config) => {
  switch (config.type) {
    case 'report':
      return pbi.models.validateReportLoad(config);
    case 'dashboard':
      return pbi.models.validateDashboardLoad(config);
    case 'tile':
      return pbi.models.validateTileLoad(config);
    default:
      throw 'Unknown config type allowed types are report, dashboard or tile';
  }
};

const validateCreateReportConfig = (config) => {
  if (!config.embedUrl) return 'Embed URL is required';
  return pbi.models.validateCreateReport(config);
};

const validateConfig = (config) => {
  const isCreateMode = config.reportMode === 'create';
  return isCreateMode
    ? validateCreateReportConfig(config)
    : validateTypeConfig(config);
};

export {
  validateConfig,
  createReportConfig,
  createDashboardConfig,
  createTileConfig,
};
