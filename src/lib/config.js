import { models } from 'powerbi-client';
import { clean, isEmptyObject } from "./utils";
import pbi from 'powerbi-client';

const createConfig = props => {
    if (props) {
      const {
        embedType,
        tokenType,
        accessToken,
        embedUrl,
        embedId,
        permissions,
        pageName,
        bookmark,
        extraSettings,
        dashboardId,
        datasetId,
        reportMode,
      } = props;
      if(embedType === 'report' && reportMode === 'create') {
        return clean({
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
        datasetId: datasetId
      });

      const settings = isEmptyObject(cleanSettings) ? {} : { settings: cleanSettings };

      const datasetBinding = isEmptyObject(cleanDataSetBinding) ? {} : { datasetBinding: cleanDataSetBinding };

      return clean({
        type: embedType,
        tokenType: models.TokenType[tokenType],
        accessToken,
        embedUrl,
        id: embedId,
        pageName: pageName,
        bookmark: bookmark,
        dashboardId: dashboardId,
        permissions: models.Permissions[permissions],
        reportMode,
        ...settings,
        ...datasetBinding
      });
    }
    return null;
  };

  const validateTypeConfig = config => {
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
  
  const validateCreateReportConfig = config => {
    if(!config.embedUrl)
      return 'Embed URL is required';
    return pbi.models.validateCreateReport(config);
  };
  
  const validateConfig = config => {
    const isCreateMode = config.reportMode === 'create';
    return isCreateMode ? validateCreateReportConfig(config) : validateTypeConfig(config);
  };

export { createConfig, validateConfig }
