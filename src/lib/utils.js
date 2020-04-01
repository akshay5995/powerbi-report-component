import pbi from 'powerbi-client';

// Removes null, undefined and empty string from given object
const clean = obj => {
  const propNames = Object.getOwnPropertyNames(obj);
  propNames.forEach(element => {
    if (
      obj[element] === null ||
      obj[element] === undefined ||
      obj[element] === ''
    ) {
      delete obj[element];
    }
  });
  return obj;
};

const validateTypeConfig = config => {
  switch (config.type) {
    case 'report':
      return pbi.models.validateReportLoad(config);
    case 'dashboard':
      return pbi.models.validateDashboardLoad(config);
    default:
      return 'Unknown config type';
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

export { clean, validateConfig };
