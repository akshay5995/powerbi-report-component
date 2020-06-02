import React from 'react';
import { Layout, Tabs, Badge } from 'antd';
import { FormOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Tile } from '../../../lib';
import Form from './Form';

const { Content } = Layout;
const { TabPane } = Tabs;

const initialTileProps = {
  tokenType: 'Embed',
};

const TileDemo = () => {
  const [tileProps, setTileProps] = React.useState(initialTileProps);
  const [isValidConfig, setIsValidConfig] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('form');

  const onTabClick = (key, event) => setActiveTab(key);

  const renderWithTileProps = React.useCallback(
    ({ tileProps }) => {
      setTileProps(tileProps);
      setIsValidConfig(true);
    },
    [tileProps]
  );

  const onReset = React.useCallback(() => {
    setIsValidConfig(false);
  }, [isValidConfig]);

  return (
    <Content>
      <Tabs activeKey={activeTab} onTabClick={onTabClick}>
        <TabPane
          tab={
            <span>
              <FormOutlined />
              Form
            </span>
          }
          key="form"
        >
          <Form
            initialTileProps={initialTileProps}
            onSubmit={renderWithTileProps}
            onReset={onReset}
          />
        </TabPane>
        <TabPane
          disabled={!isValidConfig}
          tab={
            <Badge dot={isValidConfig}>
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                Tile
              </span>
            </Badge>
          }
          key="tile"
        >
          {isValidConfig && (
            <Tile
              style={{
                height: '100%',
                border: '0',
              }}
              {...tileProps}
              onClick={(data) => {
                console.log('Data from tile', data);
              }}
              onLoad={(data) => {
                console.log('Tile loaded', data);
              }}
            />
          )}
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default TileDemo;
