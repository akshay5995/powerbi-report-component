import React from 'react';
import { Layout, Tabs, Badge } from 'antd';
import { FormOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Dashboard } from '../../lib';
import Form from './Form';

const { Content } = Layout;
const { TabPane } = Tabs;

const initalDashboardProps = {
  tokenType: 'Embed',
};

const DashboardDemo = () => {
  const [dashboardProps, setDashboardProps] = React.useState(
    initalDashboardProps
  );
  const [isVaildConfig, setIsValidConfig] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('form');

  const onTabClick = (key, event) => setActiveTab(key);

  const renderWithDashboardrops = React.useCallback(
    ({ dashboardProps }) => {
      setDashboardProps(dashboardProps);
      setIsValidConfig(true);
    },
    [dashboardProps]
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
            initalDashboardProps={initalDashboardProps}
            onSubmit={renderWithDashboardrops}
            onReset={onReset}
          />
        </TabPane>
        <TabPane
          disabled={!isVaildConfig}
          tab={
            <Badge dot={isVaildConfig}>
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                Dashboard
              </span>
            </Badge>
          }
          key="dashboard"
        >
          {isVaildConfig && (
            <Dashboard
              {...dashboardProps}
              style={{
                height: '100%',
                border: '0',
              }}
              onTileClicked={(data) => {
                console.log('Data from tile', data);
              }}
              onLoad={(data) => {
                console.log('Dashboard loaded', data);
              }}
            />
          )}
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default DashboardDemo;
