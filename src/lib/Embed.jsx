/* eslint-disable */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import pbi from 'powerbi-client';

// powerbi object is global

const validateConfig = config => {
  switch (config.type) {
    case 'report':
      return pbi.models.validateReportLoad(config);
    case 'dashboard':
      return pbi.models.validateDashboardLoad(config);
    default:
      return 'Unknown config type';
  }
};

const validateCreateReportConfig = config => {
    if(!config.embedUrl)
      return 'Embed URL is required';
    return pbi.models.validateCreateReport(config);
};

class Embed extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.component = null;
    this.reportRef = React.createRef();
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState(this.props.config);
  }

  static getDerivedStateFromProps(props, state) {
    return { ...props.config };
  }

  componentDidUpdate() {
    const errors = this.state.reportMode === 'create' ? validateCreateReportConfig(this.state) : validateConfig(this.state);
    if (!errors) {
      return this.embed(this.state);
    } else if (this.component !== null) {
      this.reset();
    }
    return null;
  }

  embed(config) {
    if(config.reportMode === 'create')
    this.component = powerbi.createReport(this.reportRef.current, config);
    else {
    this.component = powerbi.embed(this.reportRef.current, config);
    }
    if (this.props.performOnEmbed) {
      this.props.performOnEmbed(this.component, this.reportRef.current);
    }
    return this.component;
  }

  updateState(config) {
    const nextState = Object.assign({}, this.state, config);
    this.setState(nextState);
  }

  render() {
    return (
      <div
        className="report"
        style={this.props.style}
        ref={this.reportRef}
      />
    );
  }
}

Embed.propTypes = {
  config: PropTypes.object.isRequired,
  performOnEmbed: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Embed;
