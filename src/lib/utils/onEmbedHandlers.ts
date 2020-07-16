import { validateAndInvokeCallback } from '../utils';
import {
  ReportProps,
  DashboardProps,
  TileProps,
  ReportVisualProps,
} from '../types';

const reportHandler = (
  report: any,
  reportRef: any,
  props: ReportProps
): void => {
  const { reportMode } = props;
  const isCreateMode = reportMode === 'Create';
  const reportInstance = window.powerbi.get(reportRef);

  report.on('loaded', () => {
    validateAndInvokeCallback(props.onLoad, reportInstance);
  });

  report.on('error', (event: any) =>
    validateAndInvokeCallback(props.onError, event.detail)
  );

  report.on('saved', (event: any) =>
    validateAndInvokeCallback(props.onSave, event.detail)
  );

  if (!isCreateMode) {
    report.on('rendered', () =>
      validateAndInvokeCallback(props.onRender, reportInstance)
    );

    report.on('dataSelected', (event: any) =>
      validateAndInvokeCallback(props.onSelectData, event.detail)
    );

    report.on('pageChanged', (event: any) =>
      validateAndInvokeCallback(props.onPageChange, event.detail)
    );

    report.on('buttonClicked', (event: any) =>
      validateAndInvokeCallback(props.onButtonClicked, event.detail)
    );

    report.on('commandTriggered', (event: any) =>
      validateAndInvokeCallback(props.onCommandTriggered, event.detail)
    );
  }
};

const reportVisualHandler = (
  reportVisual: any,
  reportRef: any,
  props: ReportVisualProps
): void => {
  const reportInstance = window.powerbi.get(reportRef);

  reportVisual.on('loaded', () => {
    validateAndInvokeCallback(props.onLoad, reportInstance);
  });

  reportVisual.on('rendered', () =>
    validateAndInvokeCallback(props.onRender, reportInstance)
  );

  reportVisual.on('dataSelected', (event: any) =>
    validateAndInvokeCallback(props.onSelectData, event.detail)
  );
};

const dashboardHandler = (
  dashboard: any,
  dashboardRef: any,
  props: DashboardProps
): void => {
  if (props.onLoad)
    props.onLoad(dashboard, window.powerbi.get(dashboardRef));

  dashboard.on('tileClicked', (event: any) =>
    validateAndInvokeCallback(props.onTileClicked, event.detail)
  );
};

const tileHandler = (tile: any, props: TileProps): void => {
  tile.on('tileLoaded', (event: any) =>
    validateAndInvokeCallback(props.onLoad, event.detail)
  );

  tile.on('tileClicked', (event: any) =>
    validateAndInvokeCallback(props.onClick, event.detail)
  );
};

export {
  reportHandler,
  dashboardHandler,
  tileHandler,
  reportVisualHandler,
};
