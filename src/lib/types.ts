export type ReportModes = 'View' | 'Edit' | 'Create';

export type EmbedType = 'report' | 'dashboard' | 'tile';

export type TokenType = 'Aad' | 'Embed';

export type Permissions =
  | 'Read'
  | 'ReadWrite'
  | 'Copy'
  | 'Create'
  | 'All';

export type PageView = 'fitToWidth' | 'oneColumn' | 'actualSize';

export interface IError {
  message: string;
  detailedMessage?: string;
  errorCode?: string;
}

export interface TileProps {
  tokenType: TokenType;
  accessToken: string;
  embedUrl: string;
  embedId: string;
  dashboardId: string;
  style?: any;
  onLoad?: Function;
  onClick?: Function;
}

export interface DashboardProps {
  tokenType: TokenType;
  accessToken: string;
  embedUrl: string;
  embedId: string;
  pageView: PageView;
  style?: any;
  onLoad?: Function;
  onTileClicked?: Function;
}

export interface ReportProps {
  tokenType: TokenType;
  accessToken: string;
  embedUrl: string;
  embedId: string;
  groupId: string;
  permissions: Permissions;
  reportMode: ReportModes;
  pageName?: string;
  extraSettings?: any;
  style?: any;
  datasetId?: string;
  onLoad?: Function;
  onRender?: Function;
  onError?: Function;
  onButtonClicked?: Function;
  onSelectData?: Function;
  onPageChange?: Function;
  onCommandTriggered?: Function;
  onSave?: Function;
}

export interface ReportVisualProps {
  tokenType: TokenType;
  accessToken: string;
  embedUrl: string;
  embedId: string;
  pageName: string;
  visualName: string;
  style?: any;
  onLoad?: Function;
  onRender?: Function;
  onSelectData?: Function;
}

export interface Config {
  type: EmbedType;
  tokenType: TokenType;
  accessToken: string;
  embedUrl: string;
  pageName: string;
  groupId: string;
  visualName: string;
  extraSettings: any;
  permissions: Permissions;
  id: string;
  reportMode: ReportModes;
  datasetId: string;
  pageView: PageView;
  dashboardId: string;
}

export interface Embed {
  config: Config;
  performOnEmbed: (report: any, reportRef?: any) => void;
  style: any;
}
