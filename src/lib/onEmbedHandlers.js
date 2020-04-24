import { validateAndInvokeCallback } from './utils';

const REPORT_EVENTS = [
  'loaded',
  'rendered',
  'error',
  'saved',
  'dataSelected',
  'pageChanged',
  'buttonClicked',
  'filtersApplied',
  'commandTriggered',
];
const DASHBOARD_EVENTS = ['tileClicked'];
const TILE_EVENTS = ['tileLoaded', 'tileClicked'];

const clearAllHandlersAfterRerender = (report, events) => {
  events.forEach((event) => report.off(event));
};

const reportHandler = (report, reportMode, props) => {
  const isCreateMode = reportMode === 'create';
  clearAllHandlersAfterRerender(report, REPORT_EVENTS);

  report.on('loaded', () => {
    if (reportMode === 'edit') {
      report.switchMode(reportMode);
    }

    validateAndInvokeCallback(props.onLoad, report);
  });

  report.on('error', (event) =>
    validateAndInvokeCallback(props.onError, event.detail)
  );

  report.on('saved', (event) =>
    validateAndInvokeCallback(props.onSave, event.detail)
  );

  if (!isCreateMode) {
    report.on('rendered', () =>
      validateAndInvokeCallback(props.onRender, report)
    );

    report.on('dataSelected', (event) =>
      validateAndInvokeCallback(props.onSelectData, event.detail)
    );

    report.on('pageChanged', (event) =>
      validateAndInvokeCallback(props.onPageChange, event.detail)
    );

    report.on('buttonClicked', (event) =>
      validateAndInvokeCallback(props.onButtonClicked, event.detail)
    );

    report.on('filtersApplied', (event) =>
      validateAndInvokeCallback(props.onFiltersApplied, event.detail)
    );

    report.on('commandTriggered', (event) =>
      validateAndInvokeCallback(props.onCommandTriggered, event.detail)
    );
  }
};

const dashboardHandler = (report, reportRef, props) => {
  clearAllHandlersAfterRerender(report, DASHBOARD_EVENTS);

  if (props.onLoad) props.onLoad(report, powerbi.get(reportRef));

  report.on('tileClicked', (event) =>
    validateAndInvokeCallback(props.onTileClicked, event.detail)
  );
};

const tileHandler = (report, props) => {
  clearAllHandlersAfterRerender(report, TILE_EVENTS);

  report.on('tileLoaded', (event) =>
    validateAndInvokeCallback(props.onLoad, event.detail)
  );

  report.on('tileClicked', (event) =>
    validateAndInvokeCallback(props.onTileClicked, event.detail)
  );
};

export { reportHandler, dashboardHandler, tileHandler };
