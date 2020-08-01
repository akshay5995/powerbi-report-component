import React from 'react';
import { Layout, Tabs, Badge } from 'antd';
import { FormOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { ReportVisual } from '../../../lib';
import Form from './Form';

const { Content } = Layout;
const { TabPane } = Tabs;

const initialReportProps = {
  tokenType: 'Embed',
};

const ReportVisualDemo = () => {
  const [reportVisualProps, setReportVisualProps] = React.useState(
    initialReportProps
  );
  const [isValidConfig, setIsValidConfig] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('form');

  const onTabClick = (key, event) => setActiveTab(key);

  const renderWithReportProps = React.useCallback(
    ({ reportVisualProps }) => {
      setReportVisualProps(reportVisualProps);
      setIsValidConfig(true);
    },
    [reportVisualProps]
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
            initialReportProps={initialReportProps}
            onSubmit={renderWithReportProps}
            onReset={onReset}
          />
        </TabPane>
        <TabPane
          disabled={!isValidConfig}
          tab={
            <Badge dot={isValidConfig}>
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                ReportVisual
              </span>
            </Badge>
          }
          key="report"
        >
          {isValidConfig && (
            <ReportVisual
              style={{
                height: '100%',
                border: '0',
              }}
              {...reportVisualProps}
              onLoad={(report) => {
                console.log('Report Loaded!');
              }}
              onRender={(report) => {
                console.log('Report Rendered');
              }}
              onSelectData={(data) => {
                console.log('Data selected', data);
              }}
            />
          )}
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default ReportVisualDemo;
