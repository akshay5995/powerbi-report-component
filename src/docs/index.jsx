import React, { Component } from 'react';
import { render } from 'react-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Report from '../lib';
import './styles.css';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      embedType: 'report',
      tokenType: 'Embed',
      accessToken: '',
      embedUrl: '',
      embedId: '',
      permissions: 'All',
      filterPaneEnabled: 'filter-false',
      navContentPaneEnabled: 'nav-false',
      flag: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.getCode = this.getCode.bind(this);
  }

  getCode(view = true) {
    const {
      embedType,
      tokenType,
      accessToken,
      embedUrl,
      embedId,
      permissions,
    } = this.state;
    const viewAccessToken = accessToken && `${accessToken.slice(0, 10)}...`;
    const viewEmbedUrl = embedUrl && `${embedUrl.slice(0, 10)}...`;
    return `<Report embedType="${embedType}"
    tokenType="${tokenType}"
    accessToken="${view ? viewAccessToken : accessToken}"
    embedUrl="${view ? viewEmbedUrl : embedUrl}"
    embedId="${embedId}"
    extraSettings={{
      filterPaneEnabled: ${this.state.filterPaneEnabled === 'filter-true'},
      navContentPaneEnabled: ${this.state.navContentPaneEnabled === 'nav-true'},
    }}
    permissions="${permissions}"
    style={{
      height: '100%',
      border: '0',
      padding: '20px',
      background: '#eee'
    }}
    onLoad={() => { console.log('Report Loaded!'); }}
    onSelectData={(data) => { 
      window.alert('You clicked chart: + data.visual.title); 
    }}
    onPageChange={(data) => { 
      window.alert('You changed page to + data.newPage.displayName); 
    }}
  />`;
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const {
      embedType,
      tokenType,
      accessToken,
      embedUrl,
      embedId,
      permissions,
    } = this.state;
    const style = {
      report: {
        height: '100%', border: '0', padding: '20px', background: '#eee',
      },
    };
    const extraSettings = {
      filterPaneEnabled: this.state.filterPaneEnabled === 'filter-true',
      navContentPaneEnabled: this.state.navContentPaneEnabled === 'nav-true',
    };
    return (
      <div className="root">
        <div className="header">Power BI Report Component Demo</div>
        <div className="container">
          <div className="config">
            <span>Embed Type: <input name="embedToken" onChange={this.handleChange} value={embedType} required /></span>
            <span>Token Type: <input name="tokenType" onChange={this.handleChange} value={tokenType} required /></span>
            <span>Token: <input name="accessToken" onChange={this.handleChange} value={accessToken} required /></span>
            <span>Embed Url: <input name="embedUrl" onChange={this.handleChange} value={embedUrl} required /></span>
            <span>Embed Id: <input name="embedId" onChange={this.handleChange} value={embedId} required /></span>
            <span>Permissions: <input name="permissions" onChange={this.handleChange} value={permissions} required /></span>
            <span>
            Display Nav Pane:
              <span><input checked={this.state.navContentPaneEnabled === 'nav-true'} type="radio" value="nav-true" name="navContentPaneEnabled" onChange={this.handleChange} />True</span>
              <span><input checked={this.state.navContentPaneEnabled === 'nav-false'} type="radio" value="nav-false" name="navContentPaneEnabled" onChange={this.handleChange} />False</span>
            </span>
            <span>
            Display Filter Pane:
              <span><input checked={this.state.filterPaneEnabled === 'filter-true'} type="radio" value="filter-true" name="filterPaneEnabled" onChange={this.handleChange} />True</span>
              <span><input checked={this.state.filterPaneEnabled === 'filter-false'} type="radio" value="filter-false" name="filterPaneEnabled" onChange={this.handleChange} />False</span>
            </span>
            <button onClick={() => {
              if (!this.state.flag) {
                this.setState({
                flag: true,
                });
              } else {
                this.forceUpdate();
              }
            }}
            >Run
            </button>
          </div>
          <div className="code">
            <span className="codeHeader">
              <h2>Code:</h2>
              <CopyToClipboard
                text={this.getCode(false)}
              >
                <button className="copyBtn">Copy</button>
              </CopyToClipboard>
            </span>
            <pre>
              <code className="language-css">
                {
                  this.getCode()
                }
              </code>
            </pre>
          </div>
        </div>
        {this.state.flag && <Report
          embedType={embedType}
          tokenType={tokenType}
          accessToken={accessToken}
          embedUrl={embedUrl}
          embedId={embedId}
          extraSettings={extraSettings}
          permissions={permissions}
          style={style.report}
          onLoad={() => { console.log('Report Loaded!'); }} //eslint-disable-line
          onSelectData={(data) => { window.alert(`You clicked chart: ${data.visual.title}`); }} //eslint-disable-line
          onPageChange={(data) => { console.log(`You changed page to: ${data.newPage.displayName}`); }} //eslint-disable-line
        />}
      </div>
    );
  }
}

render(<Demo />, document.getElementById('app'));
