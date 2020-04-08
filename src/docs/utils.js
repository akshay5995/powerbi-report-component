import { defaultEmbedToken, defaultEmbedUrl, defaultReportId } from './defaults';

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
  accessToken: defaultEmbedToken,
  embedUrl: defaultEmbedUrl,
  embedId: defaultReportId,
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
  theme: {
    "name": "Waveform", 
    "dataColors": ["#31B6FD", "#4584D3", "#5BD078", "#A5D028", "#F5C040", "#05E0DB", "#3153FD", "#4C45D3", "#5BD0B0", "#54D028", "#D0F540", "#057BE0"],
    "background":"#FFFFFF",
    "foreground": "#4584D3",
    "tableAccent": "#31B6FD"
},
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
