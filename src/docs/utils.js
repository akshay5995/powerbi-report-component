const defaultOptions = {
  report: {
    mode: 'view',
    embedModes: ['view', 'edit', 'create'],
  },
  dashboard: {
    mode: 'view',
    embedModes: ['view'],
  },
  tile: {
    mode: 'view',
    embedModes: ['view'],
  },
};

const embedTypes = Object.keys(defaultOptions);

const initializeState = type => ({
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
  theme: {},
show: false
});

const isObject = obj => {
  return (typeof obj === "object" && obj !== null) || typeof obj === "function";
}

export {
  embedTypes,
  defaultOptions,
  initializeState,
  isObject,
};
