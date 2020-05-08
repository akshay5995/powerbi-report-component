const defaultOptions = {
  common: {
    tokenType: ['Embed', 'Aad'],
  },
  report: {
    mode: 'view',
    embedModes: ['view', 'edit', 'create'],
  },
  dashboard: {
    mode: 'view',
    embedModes: ['view'],
    pageView: 'fitToWidth',
    pageViews: ['fitToWidth', 'oneColumn', 'actualSize'],
  },
  tile: {
    mode: 'view',
    embedModes: ['view'],
  },
};

const embedTypes = Object.keys(defaultOptions);

const initializeState = (type) => ({
  embedType: type,
  tokenType: 'Embed',
  accessToken: '',
  embedUrl: '',
  embedId: '',
  pageName: '',
  dashboardId: '',
  permissions: 'All',
  tileId: '',
  filterPaneEnabled: 'filter-false',
  navContentPaneEnabled: 'nav-false',
  visualHeaderFlag: true,
  flag: false,
  reportMode: defaultOptions[type].mode,
  datasetId: '',
  pageView: defaultOptions[type].pageView,
});

export { embedTypes, defaultOptions, initializeState };
