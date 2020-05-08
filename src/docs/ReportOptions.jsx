import React, { useState, Fragment } from 'react';
import './custom.scss';
import { defaultOptions } from './utils';
import { renderInput, renderDropdown, renderRadioInput } from './common';

const ReportOptions = (props) => {
  const { options, handleChange, handleSelect, saveReport } = props;
  const [createMode] = useState(options.reportMode === 'create');
  const [modes] = useState(defaultOptions['report'].embedModes);

  const onChange = (event) => {
    handleChange(event);
  };

  const onSelect = (name) => (option) => {
    handleSelect(name, option);
  };

  return (
    <div>
      {renderDropdown('Mode (optional, default: "view")','reportMode', modes, options['reportMode'], onSelect)}
      {renderInput('Token Type', 'tokenType', options['tokenType'], true, true)}
      {renderInput('Token', 'accessToken', options['accessToken'], onChange, true)}
      {renderInput('Embed Url', 'embedUrl', options['embedUrl'], onChange, true)}
      {!createMode && renderInput('Embed Id', 'embedId', options['embedId'], onChange, true)}
      {createMode ? 
        (renderInput('Dataset Id', 'datasetId', options['datasetId'], onChange, true)):
        (renderInput('Dataset Id', 'datasetId', options['datasetId'], onChange))
       }
      {!createMode && (
        <div>
                <Fragment>
                  {renderInput('Page Name (optional)', 'pageName', options['pageName'], onChange, true)}
                  {renderInput('Permissions', 'permissions', options['permissions'], onChange, true)}
                  <span>
                    <b className="fieldName">Display Nav Pane</b>
                    {renderRadioInput('True',options['navContentPaneEnabled'] === 'nav-true','navContentPaneEnabled','nav-true', onChange)}
                    {renderRadioInput('False',options['navContentPaneEnabled'] === 'nav-false','navContentPaneEnabled','nav-false', onChange)}
                  </span>
                  <span>
                    <b className="fieldName">Display Filter Pane</b>
                    {renderRadioInput('True',options['filterPaneEnabled'] === 'filter-true','filterPaneEnabled','filter-true', onChange)}
                    {renderRadioInput('False',options['filterPaneEnabled'] === 'filter-false','filterPaneEnabled','filter-false', onChange)}
                  </span>
                </Fragment>
                                <span className="interactions">
                                <div>
                                  Actions using <code>report</code> reference
                                </div>
                                <button
                                  className="interactionBtn"
                                  disabled={!options.flag || options.tileFlag}
                                  onClick={() => {
                                    if (this.report) {
                                      this.report.fullscreen();
                                    }
                                  }}
                                >
                                  Fullscreen
                                </button>
                                <button
                                  className="interactionBtn"
                                  disabled={!options.reportFlag || !options.flag}
                                  onClick={() => {
                                    if (this.report) {
                                      this.report.switchMode('edit');
                                    }
                                  }}
                                >
                                  Edit Mode
                                </button>
                                <button
                                  className="interactionBtn"
                                  disabled={!options.reportFlag || !options.flag}
                                  onClick={() => {
                                    if (this.report) {
                                      this.report.switchMode('view');
                                    }
                                  }}
                                >
                                  View Mode
                                </button>
                                <button
                                  className="interactionBtn"
                                  disabled={!options.reportFlag || !options.flag}
                                  onClick={() => {
                                    if (this.report) {
                                      this.report
                                        .setFilters([filter])
                                        .catch((errors) => {
                                          console.log(errors);
                                        });
                                    }
                                  }}
                                >
                                  Set Filter
                                </button>
                                <button
                                  className="interactionBtn"
                                  disabled={!options.reportFlag || !options.flag}
                                  onClick={() => {
                                    if (this.report) {
                                      this.report.removeFilters().catch((errors) => {
                                        console.log(errors);
                                      });
                                    }
                                  }}
                                >
                                  Remove Filter
                                </button>
                                <button
                                  className="interactionBtn"
                                  disabled={!options.reportFlag || !options.flag}
                                  onClick={() => this.toggleAllVisualHeaders()}
                                >
                                  Toggle Visual Header
                                </button>
                                <button
                                  className="interactionBtn"
                                  disabled={!options.reportFlag || !options.flag}
                                  onClick={() => {
                                    if (this.report) {
                                      this.report.print();
                                    }
                                  }}
                                >
                                  Print
                                </button>
                                <button
                                  className="interactionBtn"
                                  disabled={!options.reportFlag || !options.flag || !options.isCreateMode}
                                  onClick={saveReport}
                                >
                                  Save
                                </button>
                              </span>
                              </div>
              )}
    </div>
  );
};

export default ReportOptions;
