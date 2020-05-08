import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import './styles.css';
import { Report, Dashboard, Tile } from '../lib';
import { initializeState, embedTypes, defaultOptions } from './utils';
import ReportOptions  from './ReportOptions';
import  DashboardOptions  from './DashboardOptions';
import TileOptions  from './TileOptions';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.report = null;
    this.state = initializeState('report');
    this.handleChange = this.handleChange.bind(this);
    this.toggleAllVisualHeaders = this.toggleAllVisualHeaders.bind(
      this
    );
    this.onSelect = this.onSelect.bind(this);
    this.onSelectChild = this.onSelectChild.bind(this);
    this.resetState = this.resetState.bind(this);
    this.saveReport = this.saveReport.bind(this);
    this.renderByEmbedType = this.renderByEmbedType.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSelect = (state) => (option) => {
    const { value } = option;
    console.log(JSON.stringify(option));
    this.resetState(() => this.setState({ [state]: value }));
  };

  onSelectChild = (state, option) => {
    const { value } = option;
    console.log(JSON.stringify(option));
    this.resetState(() => this.setState({ [state]: value }));
  };

  toggleAllVisualHeaders() {
    const newSettings = {
      visualSettings: {
        visualHeaders: [
          {
            settings: {
              visible: !this.state.visualHeaderFlag,
            },
          },
        ],
      },
    };
    if (this.report) {
      this.report
        .updateSettings(newSettings)
        .then(() => {
          console.log(
            'Visual header was successfully hidden for all the visuals in the report.'
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.setState({
      visualHeaderFlag: !this.state.visualHeaderFlag,
    });
  }

  resetState(callback) {
    const { embedType } = this.state;
    this.setState(initializeState(embedType), callback);
  }

  async saveReport() {
    if (this.report) {
      try {
        await this.report.save();
      } catch (err) {
        console.log('Error saving report', err);
      }
    }
  }

  renderByEmbedType(isCreateMode, style, extraSettings) {
    const {
      embedType,
      tokenType,
      accessToken,
      embedUrl,
      embedId,
      permissions,
      pageName,
      dashboardId,
      reportMode,
      datasetId,
      pageView,
    } = this.state;
    switch (embedType) {
      case 'dashboard':
        return (
          <Dashboard
            tokenType={tokenType}
            accessToken={accessToken}
            embedUrl={embedUrl}
            embedId={embedId}
            style={style.report}
            pageView={pageView}
            onLoad={(dashboard) => {
              console.log('Dashboard Loaded!');
              this.report = dashboard;
            }}
            onTileClicked={(data) => {
              console.log('Data from tile', data);
            }}
          />
        );
      case 'report':
        return isCreateMode ? (
          <Report
            tokenType={tokenType}
            accessToken={accessToken}
            embedUrl={embedUrl}
            style={style.report}
            reportMode={reportMode}
            datasetId={datasetId}
            onLoad={(report) => {
              console.log('Report Loaded!');
              this.report = report;
            }}
            onRender={(report) => {
              console.log('Report Redered!');
              this.report = report;
            }}
            onSave={(data) => {
              console.log('Report saved. Event data ', data);
            }}
            onError={(data) => {
              console.log('Error', data);
            }}
          />
        ) : (
          <Report
            tokenType={tokenType}
            accessToken={accessToken}
            embedUrl={embedUrl}
            embedId={embedId}
            dashboardId={dashboardId}
            extraSettings={extraSettings}
            permissions={permissions}
            pageName={pageName}
            style={style.report}
            reportMode={reportMode}
            datasetId={datasetId}
            onLoad={(report) => {
              console.log('Report Loaded!');
              this.report = report;
            }}
            onRender={(report) => {
              console.log('Report Rendered!');
              this.report = report;
            }}
            onSelectData={(data) => {
              console.log('Data selected', data);
            }}
            onError={(data) => {
              console.log('Error', data);
            }}
          />
        );
      case 'tile':
        return (
          <Tile
            tokenType={tokenType}
            accessToken={accessToken}
            embedUrl={embedUrl}
            embedId={embedId}
            dashboardId={dashboardId}
            style={style.report}
            onClick={(data) => {
              console.log('Data from tile', data);
            }}
            onLoad={(data) => {
              console.log('Tile loaded', data);
            }}
          />
        );
    }
  }

  render() {
    const {
      embedType,
      tokenType,
      accessToken,
      embedUrl,
      embedId,
      permissions,
      pageName,
      dashboardId,
      flag,
      reportMode,
      datasetId,
      pageView,
    } = this.state;

    const style = {
      report: {
        height: '100%',
        border: '0',
      },
    };

    const extraSettings = {
      filterPaneEnabled: this.state.filterPaneEnabled === 'filter-true',
      navContentPaneEnabled:
        this.state.navContentPaneEnabled === 'nav-true',
      hideErrors: false,
    };

    const filter = {
      $schema: 'http://powerbi.com/product/schema#basic',
      target: {
        table: 'Geo',
        column: 'Region',
      },
      operator: 'In',
      values: ['West'],
    };

    const reportFlag = embedType === 'report';
    const tileFlag = embedType === 'tile';
    const isDashboard = embedType === 'dashboard';
    const isCreateMode = reportMode === 'create';

    return (
      <div className="root">
        <SplitterLayout percentage secondaryInitialSize={70}>
          {this.state.flag ? (
            this.renderByEmbedType(isCreateMode, style, extraSettings)
          ) : (
            <div className="placeholder">
              <h1>Report will be displayed in this section</h1>
              <div>
                <h3>Instructions</h3>
                <ol>
                  <li>Fill in the details on the right</li>
                  <li>Click on Run</li>
                  <li>
                    Drag the bar on the right to resize the sections
                  </li>
                </ol>
              </div>
            </div>
          )}
          <div className="container">
            <div className="config">
              <span className="header">PowerBi Report Component</span>
              <span>
                <b className="fieldName">Embed Type</b>
                <Dropdown
                  options={embedTypes}
                  onChange={this.onSelect('embedType')}
                  value={embedType}
                />
              </span>
              {reportFlag && (
                <ReportOptions 
                  options={this.state}
                  handleChange={this.handleChange}
                  handleSelect={(name, option) => this.onSelectChild(name, option)}
                  saveReport={this.saveReport}
                />
              )}
              {
                isDashboard && (
                  <DashboardOptions 
                  options={this.state}
                  handleChange={this.handleChange}
                  handleSelect={(name, option) => this.onSelectChild(name, option)}/>
                )
              }
              {
                tileFlag && (
                  <TileOptions 
                  options={this.state}
                  handleChange={this.handleChange}
                  handleSelect={(name, option) => this.onSelectChild(name, option)}/>
                )
              }
              {/*              
              {!isCreateMode && (
                <span className="interactions">
                  <div>
                    Actions using <code>report</code> reference
                  </div>
                  <button
                    className="interactionBtn"
                    disabled={!flag || tileFlag}
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
                    disabled={!reportFlag || !flag}
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
                    disabled={!reportFlag || !flag}
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
                    disabled={!reportFlag || !flag}
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
                    disabled={!reportFlag || !flag}
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
                    disabled={!reportFlag || !flag}
                    onClick={() => this.toggleAllVisualHeaders()}
                  >
                    Toggle Visual Header
                  </button>
                  <button
                    className="interactionBtn"
                    disabled={!reportFlag || !flag}
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
                    disabled={!reportFlag || !flag || !isCreateMode}
                    onClick={this.saveReport}
                  >
                    Save
                  </button>
                </span>
              )}
               */}
              <span className="runBtnHolder">
                <button
                  className="runBtn"
                  onClick={() => {
                    if (!flag) {
                      this.setState({
                        flag: true,
                      });
                    }
                  }}
                >
                  Run
                </button>
              </span>
            </div>
            <footer>
              {'Made with ❤️ by '}
              <a href="https://github.com/akshay5995">@akshay5995</a>
            </footer>
          </div>
        </SplitterLayout>
      </div>
    );
  }
}

render(<Demo />, document.getElementById('app'));
