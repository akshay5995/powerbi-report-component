import * as React from 'react';
import { generateRandomHexWithId } from './utils/index';
import { _useReport } from './hooks/useReport';
import { Embed } from './types';

const Embed = ({ config, performOnEmbed, style }: Embed) => {
  const { id } = config;
  const randId = generateRandomHexWithId(id);
  const reportEl = React.useRef(null);
  const [_, setEmbed] = _useReport(performOnEmbed);

  React.useEffect(() => {
    if (reportEl) {
      setEmbed(reportEl, config);
    }
  }, []);

  return (
    <div className='report' style={style} ref={reportEl} id={randId} />
  );
};

export default Embed;
