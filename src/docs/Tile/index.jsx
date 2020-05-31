import React from 'react';
import { Layout, Tabs, Badge } from 'antd';
import { FormOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Tile } from '../../../lib';
import Form from './Form';

const { Content } = Layout;
const { TabPane } = Tabs;

const initalTileProps = {
  tokenType: 'Embed',
};

const TileDemo = () => {
  const [tileProps, setTileProps] = React.useState(initalTileProps);
  const [isVaildConfig, setIsValidConfig] = React.useState(false);
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
  }, [isVaildConfig]);

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
            initalTileProps={initalTileProps}
            onSubmit={renderWithTileProps}
            onReset={onReset}
          />
        </TabPane>
        <TabPane
          disabled={!isVaildConfig}
          tab={
            <Badge dot={isVaildConfig}>
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                Tile
              </span>
            </Badge>
          }
          key="tile"
        >
          {isVaildConfig && (
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
