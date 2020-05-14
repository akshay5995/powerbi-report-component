import React from 'react';
import { Layout, Tabs, Badge } from 'antd';
import { FormOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { Report } from '../../lib';
import Form from './Form';

const { Content } = Layout;
const { TabPane } = Tabs;

const initalReportProps = {
  tokenType: 'Embed',
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

  const extraSettings = {
    filterPaneEnabled: false,
    navContentPaneEnabled: false,
  };

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
                Report
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
              extraSettings={extraSettings}
              onLoad={(report) => {
                console.log('Report Loaded!');
              }}
              onRender={(report) => {
                console.log('Report Rendered');
              }}
              onSelectData={(data) => {
                console.log('Data selected', data);
              }}
              onError={(data) => {
                console.log('Error', data);
              }}
              onPageChange={(data) => {
                console.log('Page changed', data);
              }}
            />
          )}
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default ReportDemo;
