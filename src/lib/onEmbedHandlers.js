import { validateMode, validateAndInvokeCallback } from './utils';

const reportHandler = (report, reportMode, props) => {
  const isCreateMode = reportMode === 'create';

  report.on('loaded', () => {
    if (validateMode(reportMode) && reportMode !== 'view') {
      report.switchMode(reportMode);
    }

    validateAndInvokeCallback(props.onLoad, report);
  });

  report.on('rendered', () =>
    validateAndInvokeCallback(props.onRender, report)
  );

  report.on('error', (event) =>
    validateAndInvokeCallback(props.onError, event.detail)
  );

  report.on('saved', () =>
    validateAndInvokeCallback(props.onSave, report)
  );

  if (!isCreateMode) {
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
  if (props.onLoad) props.onLoad(report, powerbi.get(reportRef));

  report.on('tileClicked', (event) =>
    validateAndInvokeCallback(props.onTileClicked, event.detail)
  );
};

const tileHandler = (report, props) => {
  report.on('tileLoaded', (event) =>
    validateAndInvokeCallback(props.onLoad, event.detail)
  );

  report.on('tileClicked', (event) =>
    validateAndInvokeCallback(props.onTileClicked, event.detail)
  );
};

export { reportHandler, dashboardHandler, tileHandler };
