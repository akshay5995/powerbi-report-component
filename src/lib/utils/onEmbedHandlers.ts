import { validateAndInvokeCallback } from '../utils';
import {
  ReportProps,
  DashboardProps,
  TileProps,
} from '../types';

const reportHandler = (report: any, props: ReportProps): void => {
  const { reportMode } = props;
  const isCreateMode = reportMode === 'create';

  report.on('loaded', () => {
    if (reportMode === 'edit') {
      report.switchMode(reportMode);
    }

    validateAndInvokeCallback(props.onLoad, report);
  });

  report.on('error', (event: any) =>
    validateAndInvokeCallback(props.onError, event.detail)
  );

  report.on('saved', (event: any) =>
    validateAndInvokeCallback(props.onSave, event.detail)
  );

  if (!isCreateMode) {
    report.on('rendered', () =>
      validateAndInvokeCallback(props.onRender, report)
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

const dashboardHandler = (
  dashboard: any,
  dashboardRef: any,
  props: DashboardProps
): void => {
  if (props.onLoad)
    props.onLoad(dashboard, (window.powerbi as any).get(dashboardRef));

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

export { reportHandler, dashboardHandler, tileHandler };
