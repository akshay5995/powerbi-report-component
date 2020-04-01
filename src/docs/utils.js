export const types = ['report', 'dashboard'];

export const defaultEmbedModes = ['view', 'edit', 'create'];

export const defaultOptions = {
  report: {
    defaultEmbedMode: 'view',
    embedModes: defaultEmbedModes,
  },
  dashboard: {
    defaultEmbedMode: 'view',
    embedModes: defaultEmbedModes.filter(x => x != 'create'),
  },
};

export const initialState = mode => ({
  embedType: mode,
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
  reportMode: defaultOptions[mode].defaultEmbedMode,
  datasetId: '',
});
