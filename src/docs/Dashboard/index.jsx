import React from 'react';
import { Layout, Tabs, Badge } from 'antd';
import { FormOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Dashboard } from '../../../lib';
import Form from './Form';

const { Content } = Layout;
const { TabPane } = Tabs;

const initialDashboardProps = {
  tokenType: 'Embed',
};

const DashboardDemo = () => {
  const [dashboardProps, setDashboardProps] = React.useState(
    initialDashboardProps
  );
  const [isValidConfig, setIsValidConfig] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('form');

  const onTabClick = (key, event) => setActiveTab(key);

  const renderWithDashboardProps = React.useCallback(
    ({ dashboardProps }) => {
      setDashboardProps(dashboardProps);
      setIsValidConfig(true);
    },
    [dashboardProps]
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
            initialDashboardProps={initialDashboardProps}
            onSubmit={renderWithDashboardProps}
            onReset={onReset}
          />
        </TabPane>
        <TabPane
          disabled={!isValidConfig}
          tab={
            <Badge dot={isValidConfig}>
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                Dashboard
              </span>
            </Badge>
          }
          key="dashboard"
        >
          {isValidConfig && (
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
