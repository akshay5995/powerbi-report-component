import { validateAndInvokeCallback } from './utils';
import {
  DASHBOARD_EVENTS,
  REPORT_EVENTS,
  TILE_EVENTS,
} from './constants';

const clearAllHandlersAfterRerender = (embedInstance, events) => {
  events.forEach((event) => embedInstance.off(event));
};

const reportHandler = (report, props) => {
  const { reportMode } = props;
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

const dashboardHandler = (dashboard, dashboardRef, props) => {
  clearAllHandlersAfterRerender(dashboard, DASHBOARD_EVENTS);

  if (props.onLoad) props.onLoad(dashboard, powerbi.get(dashboardRef));

  dashboard.on('tileClicked', (event) =>
    validateAndInvokeCallback(props.onTileClicked, event.detail)
  );
};

const tileHandler = (tile, props) => {
  clearAllHandlersAfterRerender(tile, TILE_EVENTS);

  tile.on('tileLoaded', (event) =>
    validateAndInvokeCallback(props.onLoad, event.detail)
  );

  tile.on('tileClicked', (event) =>
    validateAndInvokeCallback(props.onClick, event.detail)
  );
};

export { reportHandler, dashboardHandler, tileHandler };
