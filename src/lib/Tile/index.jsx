import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Embed from '../common/Embed';
import { createTileConfig } from '../utils/config';
import { tileHandler } from '../common/onEmbedHandlers';
import { debounce, isEmptyObject } from '../utils';

const Tile = (props) => {
  const [currentConfig, setCurrentConfig] = useState({});

  const performOnEmbed = useCallback(
    (tile) => {
      debounce(tileHandler(tile, props), 250);
    },
    [props]
  );

  useEffect(() => {
    setCurrentConfig(createTileConfig(props));
  }, [props]);

  if (isEmptyObject(currentConfig)) {
    return <div> Error </div>;
  }

  return (
    <Embed
      config={currentConfig}
      performOnEmbed={performOnEmbed}
      style={props.style}
    />
  );
};

Tile.propTypes = {
  tokenType: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  embedUrl: PropTypes.string.isRequired,
  embedId: PropTypes.string.isRequired,
  dashboardId: PropTypes.string.isRequired,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  onClick: PropTypes.func,
};

export default Tile;
