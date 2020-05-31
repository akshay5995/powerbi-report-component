import * as React from 'react';
import Embed from './Embed';
import { createTileConfig } from './utils/config';
import { tileHandler } from './utils/onEmbedHandlers';
import { Config, TileProps } from './types';

const Tile = (props: TileProps) => {
  const [currentConfig, setCurrentConfig] = React.useState<Config | null>(null);

  const performOnEmbed = React.useCallback(
    (tile) => {
      tileHandler(tile, props);
    },
    [props]
  );

  React.useEffect(() => {
    setCurrentConfig(createTileConfig(props));
  }, [props]);


  if (!currentConfig) {
    return (<div>Error!</div>)
  }

  return (
    <Embed
      config={currentConfig}
      performOnEmbed={performOnEmbed}
      style={props.style}
    />
  );
};

export default Tile;
