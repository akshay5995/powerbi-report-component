const embedTypes = ['report', 'dashboard'];

const defaultOptions = {
  report: {
    mode: 'view',
    embedModes: ['view', 'edit', 'create'],
  },
  dashboard: {
    mode: 'view',
    embedModes: ['view'],
  },
};

const initializeState = type => ({
  embedType: type,
  tokenType: 'Embed',
  accessToken: '',
  embedUrl: '',
  embedId: '',
  pageName: '',
  dashboardId: '',
  permissions: 'All',
  filterPaneEnabled: 'filter-false',
  navContentPaneEnabled: 'nav-false',
  visualHeaderFlag: true,
  flag: false,
  reportMode: defaultOptions[type].mode,
  datasetId: '',
});

export {
  embedTypes,
  defaultOptions,
  initializeState
};
