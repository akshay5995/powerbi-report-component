import { models } from 'powerbi-client';
import { clean, isEmpty } from "./utils";
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
        extraSettings,
        dashboardId,
        datasetId,
        reportMode,
        theme,
      } = props;

      if(reportMode === 'create') {
        return clean({
          tokenType: models.TokenType[tokenType],
          accessToken,
          embedUrl,
          datasetId,
          reportMode,
        });
      }

      return clean({
        type: embedType,
        tokenType: models.TokenType[tokenType],
        accessToken,
        embedUrl,
        id: embedId,
        pageName: pageName,
        dashboardId: dashboardId,
        permissions: models.Permissions[permissions],
        settings: {
          filterPaneEnabled: true,
          navContentPaneEnabled: true,
          ...extraSettings,
        },
        datasetId,
        reportMode,
        theme: !isEmpty(theme)?{themeJson: theme}:null,
      });
    }
    return null;
  };

  const validateCustomTheme = config => {
    if(config.theme) {
      err = pbi.models.validateCustomTheme(config.theme);
      if(err) {
        return []
      }
    }
    return [];
    };

  const validateTypeConfig = config => {
    switch (config.type) {
      case 'report':
        return pbi.models.validateReportLoad(config) && validateCustomTheme(config);
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
