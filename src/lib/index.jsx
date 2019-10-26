/* eslint-disable*/

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { models } from 'powerbi-client';
import Embed from './Embed';
import { clean } from './utils';

const createConfig = props => {
  if (props) {
    const {
      embedType,
      tokenType,
      accessToken,
      embedUrl,
      embedId,
      permissions,
      pageName,
      extraSettings,
      dashboardId,
    } = props;

    return clean({
      type: embedType,
      tokenType: models.TokenType[tokenType],
      accessToken,
      embedUrl,
      id: embedId,
      pageName: pageName,
      dashboardId: dashboardId,
      permissions: models.Permissions[permissions],
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true,
        ...extraSettings,
      },
    });
  }
  return null;
};

class Report extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentConfig: null,
    };
    this.performOnEmbed = this.performOnEmbed.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState(this.props);
  }

  static getDerivedStateFromProps(props) {
    return { currentConfig: createConfig(props) };
  }

  performOnEmbed(report, reportRef) {
    const {
      embedType,
      onLoad,
      onRender,
      onSelectData,
      onPageChange,
      onTileClicked,
      onButtonClicked,
      onFiltersApplied,
      onCommandTriggered,
    } = this.props;

    if (embedType === 'report') {
      report.on('loaded', () => {
        if (onLoad) onLoad(report);
      });
      report.on('rendered', () => {
        if (onRender) onRender(report);
      });
      report.on('dataSelected', event => {
        if (onSelectData) {
          onSelectData(event.detail);
        }
      });
      report.on('pageChanged', event => {
        if (onPageChange) {
          onPageChange(event.detail);
        }
      });
      report.on('buttonClicked', event => {
        if (onButtonClicked) {
          onButtonClicked(event.detail);
        }
      });
      report.on('filtersApplied', event => {
        if (onFiltersApplied) {
          onFiltersApplied(event.detail);
        }
      });
      report.on('commandTriggered', event => {
        if (onCommandTriggered) {
          onCommandTriggered(event.detail);
        }
      });
    } else if (embedType === 'dashboard') {
      if (onLoad) onLoad(report, powerbi.get(reportRef));

      report.on('tileClicked', event => {
        if (onTileClicked) {
          onTileClicked(event.detail);
        }
      });
    }
  }

  updateState(props) {
    this.setState({
      currentConfig: createConfig(props),
    });
  }

  render() {
    if (!this.state.currentConfig) {
      return <div> Error </div>;
    }

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
  pageName: PropTypes.string,
  extraSettings: PropTypes.object,
  permissions: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
  onSelectData: PropTypes.func,
  onPageChange: PropTypes.func,
  onTileClicked: PropTypes.func,
  style: PropTypes.object,
};

export default Report;
