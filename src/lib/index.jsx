import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { models } from 'powerbi-client';
import Embed from './Embed';

class Report extends PureComponent {
  constructor(props) {
    super(props);
    // this.state = {
    //   currentReport: {},
    // };
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
        settings,
      } = this.props;
      return {
        type: embedType,
        tokenType: models.TokenType[tokenType],
        accessToken,
        embedUrl,
        id: embedId,
        permissions: models.permissions[permissions],
        settings,
      };
    }
    return null;
  }

  performOnEmbed(report) {
    const {
      onSelectData,
      onPageChange,
    } = this.props;
    // report.on('loaded', () => {
    //   this.setState({
    //     currentReport: reports,
    //   });
    // });
    report.on('dataSelected', (event) => {
      if (onSelectData) { onSelectData(event.detail); }
    });
    report.on('pageChanged', (event) => {
      if (onPageChange) { onPageChange(event.detail.newPage); }
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
  permissions: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired, //eslint-disable-line
  onSelectData: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired, //eslint-disable-line
};

export default Report;
