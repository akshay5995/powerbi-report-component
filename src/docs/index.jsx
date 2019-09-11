/*  eslint-disable import/no-extraneous-dependencies */

import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Report from "../lib";
import "./styles.css";

const initialState = {
  embedType: "report",
  tokenType: "Embed",
  accessToken: "",
  embedUrl: "",
  embedId: "",
  pageName: "",
  dashboardId: "",
  permissions: "All",
  filterPaneEnabled: "filter-false",
  navContentPaneEnabled: "nav-false",
  visualHeaderFlag: true,
  flag: false
};

class Demo extends Component {
  constructor(props) {
    super(props);
    this.report = null;
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.getCode = this.getCode.bind(this);
    this.toggleAllVisualHeaders = this.toggleAllVisualHeaders.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  getCode(view = true) {
    const {
      embedType,
      tokenType,
      accessToken,
      embedUrl,
      embedId,
      permissions
    } = this.state;
    const viewAccessToken = accessToken && `${accessToken.slice(0, 10)}...`;

    const viewEmbedUrl = embedUrl && `${embedUrl.slice(0, 10)}...`;

    return `<Report embedType="${embedType}"
    tokenType="${tokenType}"
    accessToken="${view ? viewAccessToken : accessToken}"
    embedUrl="${view ? viewEmbedUrl : embedUrl}"
    embedId="${embedId}"
    extraSettings={{
      filterPaneEnabled: ${this.state.filterPaneEnabled === "filter-true"},
      navContentPaneEnabled: ${this.state.navContentPaneEnabled === "nav-true"},
    }}
    permissions="${permissions}"
    style={{
      height: '100%',
      border: '0',
      padding: '20px',
      background: '#eee'
    }}
    onLoad={(report) => {
      /*
      you can set filters onLoad using:
      this.report.setFilters([filter]).catch((errors) => {
        console.log(errors);
      });*/
      console.log('Report Loaded!');
      //this.report = report (Read docs to know how to use report object that is returned)
    }}
    onSelectData={(data) => { 
      window.alert('You clicked chart:' + data.visual.title); 
    }}
    onPageChange={(data) => { 
      console.log('You changed page to:' + data.newPage.displayName); 
    }}
    onTileClicked={(data) => {
      console.log('You clicked tile:', data);
    }}
  />`;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSelect = state => option => {
    const { value } = option;
    this.resetState(() => this.setState({ [state]: value }));
  };

  toggleAllVisualHeaders() {
    const newSettings = {
      visualSettings: {
        visualHeaders: [
          {
            settings: {
              visible: !this.state.visualHeaderFlag
            }
          }
        ]
      }
    };
    if (this.report) {
      this.report
        .updateSettings(newSettings)
        .then(() => {
          console.log(
            "Visual header was successfully hidden for all the visuals in the report."
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
    this.setState({
      visualHeaderFlag: !this.state.visualHeaderFlag
    });
  }

  resetState(callback) {
    this.setState(initialState, callback);
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
      dashboardId
    } = this.state;
    const style = {
      report: {
        height: "50%",
        border: "0",
        padding: "20px",
        background: "#eee"
      }
    };
    const embedTypeOptions = ["report", "dashboard", "tile"];
    const extraSettings = {
      filterPaneEnabled: this.state.filterPaneEnabled === "filter-true",
      navContentPaneEnabled: this.state.navContentPaneEnabled === "nav-true"
    };
    const filter = {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "Geo",
        column: "Region"
      },
      operator: "In",
      values: ["West"]
    };
    const reportFlag = embedType === "report";
    const tileFlag = embedType === "tile";

    return (
      <div className="root">
        <div className="header">Power BI Report Component Demo</div>
        {this.state.flag ? (
          <Report
            embedType={embedType}
            tokenType={tokenType}
            accessToken={accessToken}
            embedUrl={embedUrl}
            embedId={embedId}
            dashboardId={dashboardId}
            extraSettings={extraSettings}
            permissions={permissions}
            pageName={pageName}
            style={style.report}
            onLoad={report => {
              console.log("You'll get back a report object with this callback");
              this.report = report;
            }} //eslint-disable-line
            onSelectData={data => {
              window.alert(`You clicked chart: ${data.visual.name}`);
            }} //eslint-disable-line
            onPageChange={data => {
              console.log(`You changed page to: ${data.newPage.displayName}`);
            }} //eslint-disable-line
            onTileClicked={data => {
              console.log("You clicked tile:", data);
            }}
          />
        ) : (
          <div className="placeholder">Report will appear here</div>
        )}
        <div className="container">
          <div className="config">
            <span>
              Embed Type:
              <Dropdown
                options={embedTypeOptions}
                onChange={this.onSelect("embedType")}
                value={embedType}
              />
            </span>
            <span>
              Token Type:
              <input
                name="tokenType"
                onChange={this.handleChange}
                value={tokenType}
                required
              />
            </span>
            <span>
              Token:
              <input
                name="accessToken"
                onChange={this.handleChange}
                value={accessToken}
                autoFocus={true}
                required
              />
            </span>
            <span>
              Embed Url:
              <input
                name="embedUrl"
                onChange={this.handleChange}
                value={embedUrl}
                required
              />
            </span>
            {tileFlag && (
              <span>
                Dashboard Id:
                <input
                  name="dashboardId"
                  onChange={this.handleChange}
                  value={dashboardId}
                  required
                />
              </span>
            )}
            <span>
             {`${tileFlag ? "Tile" : "Embed"}  Id:`}
              <input
                name="embedId"
                onChange={this.handleChange}
                value={embedId}
                required
              />
            </span>
            {reportFlag && (
              <Fragment>
                <span>
                  Page Name (optional)
                  <input
                    name="pageName"
                    onChange={this.handleChange}
                    value={pageName}
                    required
                  />
                </span>
                <span>
                  Permissions:
                  <input
                    name="permissions"
                    onChange={this.handleChange}
                    value={permissions}
                    required
                  />
                </span>
                <span>
                  Display Nav Pane:
                  <span>
                    <input
                      checked={this.state.navContentPaneEnabled === "nav-true"}
                      type="radio"
                      value="nav-true"
                      name="navContentPaneEnabled"
                      onChange={this.handleChange}
                    />
                    True
                  </span>
                  <span>
                    <input
                      checked={this.state.navContentPaneEnabled === "nav-false"}
                      type="radio"
                      value="nav-false"
                      name="navContentPaneEnabled"
                      onChange={this.handleChange}
                    />
                    False
                  </span>
                </span>

                <span>
                  Display Filter Pane:
                  <span>
                    <input
                      checked={this.state.filterPaneEnabled === "filter-true"}
                      type="radio"
                      value="filter-true"
                      name="filterPaneEnabled"
                      onChange={this.handleChange}
                    />
                    True
                  </span>
                  <span>
                    <input
                      checked={this.state.filterPaneEnabled === "filter-false"}
                      type="radio"
                      value="filter-false"
                      name="filterPaneEnabled"
                      onChange={this.handleChange}
                    />
                    False
                  </span>
                </span>
              </Fragment>
            )}
            <span className="interactions">
              General Operations:
              <button
                className="interactionBtn"
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
                disabled={!reportFlag}
                onClick={() => {
                  if (this.report) {
                    this.report.switchMode("edit");
                  }
                }}
              >
                Edit Mode
              </button>
              <button
                className="interactionBtn"
                disabled={!reportFlag}
                onClick={() => {
                  if (this.report) {
                    this.report.switchMode("view");
                  }
                }}
              >
                View Mode
              </button>
              <button
                className="interactionBtn"
                disabled={!reportFlag}
                onClick={() => {
                  if (this.report) {
                    this.report.setFilters([filter]).catch(errors => {
                      console.log(errors);
                    });
                  }
                }}
              >
                Set Filter
              </button>
              <button
                className="interactionBtn"
                disabled={!reportFlag}
                onClick={() => {
                  if (this.report) {
                    this.report.removeFilters().catch(errors => {
                      console.log(errors);
                    });
                  }
                }}
              >
                Remove Filter
              </button>
              <button
                className="interactionBtn"
                disabled={!reportFlag}
                onClick={() => this.toggleAllVisualHeaders()}
              >
                Toggle Visual Header
              </button>
              <button
                className="interactionBtn"
                disabled={!reportFlag}
                onClick={() => {
                  if (this.report) {
                    this.report.print();
                  }
                }}
              >
                Print
              </button>
            </span>
            <button
              className="runBtn"
              onClick={() => {
                if (!this.state.flag) {
                  this.setState({
                    flag: true
                  });
                }
              }}
            >
              Run
            </button>
          </div>
          <div className="code">
            <span className="codeHeader">
              <h2>Code:</h2>
              <CopyToClipboard text={this.getCode(false)}>
                <button className="copyBtn">Click to copy</button>
              </CopyToClipboard>
            </span>
            <pre>
              <code className="language-css">{this.getCode()}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

render(<Demo />, document.getElementById("app"));
