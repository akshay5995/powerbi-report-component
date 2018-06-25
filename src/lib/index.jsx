import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { models } from 'powerbi-client';
import Embed from './Embed';

class Report extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentReport: {}, //eslint-disable-line
    };
    this.performOnEmbed = this.performOnEmbed.bind(this);
    this.createConfig = this.createConfig.bind(this);
  }

  createConfig() {
    if (this.props) {
      const {
        embedType,
        tokenType,
        accessToken,
        embedUrl,
        embedId,
        permissions,
        extraSettings,
      } = this.props;
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
      if (onLoad) onLoad();
      if (!this.state.currentReport) {
        this.setState({
        currentReport: report, //eslint-disable-line
        });
      }
    });
    report.on('dataSelected', (event) => {
      if (onSelectData) { onSelectData(event.detail); }
    });
    report.on('pageChanged', (event) => {
      if (onPageChange) { onPageChange(event.detail); }
    });
  }

  render() {
    const config = this.createConfig();
    if (!config) { return <div> Error </div>; }
    return (
      <Embed
        config={config}
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
  extraSettings: PropTypes.object, //eslint-disable-line
  permissions: PropTypes.string.isRequired,
  onLoad: PropTypes.func,//eslint-disable-line
  onSelectData: PropTypes.func,//eslint-disable-line
  onPageChange: PropTypes.func, //eslint-disable-line
  style: PropTypes.object, //eslint-disable-line
};

export default Report;
