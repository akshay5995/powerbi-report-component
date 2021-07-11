export type ReportModes = 'View' | 'Edit' | 'Create';

export type EmbedType = 'report' | 'dashboard' | 'tile' | 'visual';

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

interface BasicProps {
  embedType: EmbedType;
  tokenType: TokenType;
  accessToken: string;
  embedUrl: string;
  embedId?: string;
  style?: any;
  onLoad?: Function;
}

export interface TileProps extends BasicProps {  
  dashboardId: string;
  onClick?: Function;
}

export interface DashboardProps extends BasicProps {
  pageView: PageView;
  onTileClicked?: Function;
}

export interface ReportProps extends BasicProps {
  groupId?: string;
  permissions: Permissions;
  reportMode: ReportModes;
  pageName?: string;
  extraSettings?: any;
  datasetId?: string;
  onRender?: Function;
  onError?: Function;
  onButtonClicked?: Function;
  onSelectData?: Function;
  onPageChange?: Function;
  onCommandTriggered?: Function;
  onSave?: Function;
}

export interface ReportVisualProps extends BasicProps {
  pageName: string;
  visualName: string;
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

export type ConfigProps = ReportProps | DashboardProps | TileProps | ReportVisualProps;

export interface Embed {
  config: Config;
  performOnEmbed: (report: any, reportRef?: any) => void;
  style: any;
}
