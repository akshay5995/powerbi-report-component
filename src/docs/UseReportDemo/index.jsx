import React from 'react';
import { Layout, Tabs, Badge, Button, Alert, Typography } from 'antd';
import {
  FormOutlined,
  CheckCircleTwoTone,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useReport } from '../../../lib';
import Form from './Form';
import Info from '../common/InfoTab';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Text } = Typography;

const initialReportProps = {
  type: 'report',
  tokenType: 'Embed',
  extraSettings,
};

const extraSettings = {
  filterPaneEnabled: false,
  navContentPaneEnabled: false,
};

const UseReportDemo = () => {
  const [reportProps, setReportProps] =
    React.useState(initialReportProps);
  const [isValidConfig, setIsValidConfig] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('report');

  const reportRef = React.useRef(null);
  const [report, setEmbed] = useReport();

  const onTabClick = (key, event) => setActiveTab(key);

  const renderWithReportProps = ({ reportProps }) => {
    setReportProps(reportProps);
    setEmbed(reportRef, {
      ...reportProps,
      extraSettings,
    });
    setIsValidConfig(true);
  };

  const onReset = React.useCallback(() => {
    setIsValidConfig(false);
  }, [isValidConfig]);

  const handleClick = () => {
    // you can use "report" from useReport like
    if (report) report.print();
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
            initialReportProps={initialReportProps}
            onSubmit={renderWithReportProps}
            onReset={onReset}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <InfoCircleOutlined />
              Info
            </span>
          }
          key="info"
        >
          <Info title="Why the warning?" titleType="warning" key="info">
          <Text>
              We show the report tab as default to ensure that the{' '}
              <b>reportRef</b> is set. Currently useReport is supported
              for only embedType <b>report</b>.
            </Text>
            <Button
              type="link"
              href="https://github.com/akshay5995/powerbi-report-component/blob/master/src/docs/UseReportDemo/index.jsx"
              target="_blank"
            >
              see the code
            </Button>
          </Info>
        </TabPane>
        <TabPane
          tab={
            <Badge dot={isValidConfig}>
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                Report
              </span>
            </Badge>
          }
          style={{ display: 'flex', flexFlow: 'column' }}
          key="report"
        >
          <div
            style={{
              display: 'flex',
              flexFlow: 'column',
            }}
          >
            <Alert
              message="Why show this tab as default?"
              description="By displaying this tab we ensure that the reportRef for div is set, see the code for more info."
              type="warning"
              closable
            />
            <Button
              disabled={!isValidConfig}
              type="primary"
              shape="round"
              onClick={handleClick}
              style={{ margin: '8px' }}
            >
              Print report
            </Button>
          </div>
          <div
            className="report"
            style={{
              height: '100%',
              border: '0',
            }}
            ref={reportRef}
          />
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default UseReportDemo;
