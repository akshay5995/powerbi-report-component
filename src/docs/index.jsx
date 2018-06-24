import React, { Component } from 'react';
import { render } from 'react-dom';
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
    };
    this.handleChange = this.handleChange.bind(this);
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
        height: '60%', width: 'auto', border: '0', padding: '20px', background: '#eee',
      },
    };
    return (
      <div className="root">
        <div className="header">Power BI Report Component Demo</div>
        <div className="config">
          <span>Embed Type: <input name="embedToken" onChange={this.handleChange} value={embedType} required /></span>
          <span>Token Type: <input name="tokenType" onChange={this.handleChange} value={tokenType} required /></span>
          <span>Token: <input name="accessToken" onChange={this.handleChange} value={accessToken} required /></span>
          <span>Embed Url: <input name="embedUrl" onChange={this.handleChange} value={embedUrl} required /></span>
          <span>Embed Id: <input name="embedId" onChange={this.handleChange} value={embedId} required /></span>
          <span>Permissions: <input name="permissions" onChange={this.handleChange} value={permissions} required /></span>
          <button onClick={() => this.setState({ run: !this.state.run })}>{this.state.run ? 'Hide' : 'Show'}</button>
        </div>
        {this.state.run &&
        <Report
          embedType={embedType}
          tokenType={tokenType}
          accessToken={accessToken}
          embedUrl={embedUrl}
          embedId={embedId}
          permissions={permissions}
          style={style.report}
        />}
      </div>
    );
  }
}

render(<Demo />, document.getElementById('app'));
