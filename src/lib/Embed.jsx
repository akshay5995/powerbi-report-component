import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validateConfig } from './config';

// powerbi object is global
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
    const errors = validateConfig(this.state);
    if (!errors) {
      return this.embed(this.state);
    } else if (this.component !== null) {
      this.reset();
    }
    return null;
  }

  embed(config) {
    if (config.reportMode === 'create')
      this.component = powerbi.createReport(
        this.reportRef.current,
        config
      );
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
    const { id } = this.state;

    return (
      <div
        className="report"
        style={this.props.style}
        ref={this.reportRef}
        id={id}
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
