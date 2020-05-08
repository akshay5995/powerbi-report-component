import React from 'react';
import { Layout, Tabs, Badge } from 'antd';
import { FormOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Report } from '../../lib';
import Form from './Form';

const { Content } = Layout;
const { TabPane } = Tabs;

const initalReportProps = {
  tokenType: 'Embed',
  reportMode: 'create',
};

const ReportDemo = () => {
  const [reportProps, setReportProps] = React.useState(
    initalReportProps
  );
  const [isVaildConfig, setIsValidConfig] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('form');

  const onTabClick = (key, event) => setActiveTab(key);

  const renderWithReportProps = React.useCallback(
    ({ reportProps }) => {
      setReportProps(reportProps);
      setIsValidConfig(true);
    },
    [reportProps]
  );

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
            initalReportProps={initalReportProps}
            onSubmit={renderWithReportProps}
          />
        </TabPane>
        <TabPane
          disabled={!isVaildConfig}
          tab={
            <Badge dot={isVaildConfig}>
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                Create Report
              </span>
            </Badge>
          }
          key="report"
        >
          {isVaildConfig && (
            <Report
              style={{
                height: '100%',
                border: '0',
              }}
              {...reportProps}
              onLoad={(report) => {
                console.log('Report Loaded!');
              }}
              onRender={(report) => {
                console.log('Report Redered!');
              }}
              onSave={(data) => {
                console.log('Report saved. Event data ', data);
              }}
              onError={(data) => {
                console.log('Error', data);
              }}
            />
          )}
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default ReportDemo;
