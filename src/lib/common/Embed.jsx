import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { generateRandomHexWithId } from '../utils';
import { _useReport } from '../hooks/useReport';

const Embed = ({ config, performOnEmbed, style }) => {
  const { id } = config;
  const randId = generateRandomHexWithId(id);
  const reportEl = useRef(null);
  const [_, setEmbed] = _useReport(performOnEmbed);

  useEffect(() => {
    setEmbed(reportEl, config);
  }, []);

  return (
    <div className="report" style={style} ref={reportEl} id={randId} />
  );
};

Embed.propTypes = {
  config: PropTypes.object.isRequired,
  performOnEmbed: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Embed;
