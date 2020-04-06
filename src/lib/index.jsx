import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Embed from './Embed';
import { createConfig } from './config'
import { reportHandler, dashboardHandler, tileHandler } from "./onEmbedHandlers";

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
      reportMode
    } = this.props;

    switch(embedType) {
      case 'report': reportHandler(report, reportMode, this.props); break;
      case 'dashboard': dashboardHandler(report, reportRef, this.props); break;
      case 'tile': tileHandler(report, this.props); break;
      default: break;
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
  embedId: PropTypes.string,
  pageName: PropTypes.string,
  extraSettings: PropTypes.object,
  permissions: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onSelectData: PropTypes.func,
  onPageChange: PropTypes.func,
  onTileClicked: PropTypes.func,
  style: PropTypes.object,
  reportMode: PropTypes.string,
  datasetId: PropTypes.string,
  titleId: PropTypes.string,
};

export default Report;
