/* eslint-disable*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { models } from 'powerbi-client';
import Embed from './Embed';

class Report extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentConfig: null,
    };
    this.performOnEmbed = this.performOnEmbed.bind(this);
    this.createConfig = this.createConfig.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateState(nextProps);
  }

  createConfig(props) {
    if (props) {
      const {
        embedType,
        tokenType,
        accessToken,
        embedUrl,
        embedId,
        permissions,
        extraSettings,
      } = props;
      return {
        type: embedType,
        tokenType: models.TokenType[tokenType],
        accessToken,
        embedUrl,
        id: embedId,
        permissions: models.Permissions[permissions],
        settings: {
          filterPaneEnabled: true,
          navContentPaneEnabled: true,
          ...extraSettings,
        },
      };
    }
    return null;
  }

  performOnEmbed(report) {
    const {
      onLoad,
      onSelectData,
      onPageChange,
    } = this.props;
    report.on('loaded', () => {
      if (onLoad) onLoad(report);
    });
    report.on('dataSelected', (event) => {
      if (onSelectData) { onSelectData(event.detail); }
    });
    report.on('pageChanged', (event) => {
      if (onPageChange) { onPageChange(event.detail); }
    });
  }

  updateState(props) {
    this.setState({ 
      currentConfig: this.createConfig(props),
    });
  }

  render() {
    if (!this.state.currentConfig) { return <div> Error </div>; }
    return (
      <Embed
        config={this.state.currentConfig}
        performOnEmbed={this.performOnEmbed}
        style={this.props.style}
      />
    );
  }
}


Report.propTypes = {
  embedType: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  embedId: PropTypes.string.isRequired,
  extraSettings: PropTypes.object,
  permissions: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  onSelectData: PropTypes.func,
  onPageChange: PropTypes.func,
  style: PropTypes.object,
};

export default Report;
