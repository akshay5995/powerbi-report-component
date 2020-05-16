import React from 'react';
import { Layout, Tabs, Badge, Button, Alert, Typography } from 'antd';
import {
  FormOutlined,
  CheckCircleTwoTone,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useReport } from '../../lib';
import Form from './Form';
import Info from '../common/InfoTab';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Text } = Typography;

const initalReportProps = {
  embedType: 'report',
  tokenType: 'Embed',
};

const UseReportDemo = () => {
  const [reportProps, setReportProps] = React.useState(
    initalReportProps
  );
  const [isVaildConfig, setIsValidConfig] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('report');

  const reportRef = React.useRef(null);
  const [report, setEmbed] = useReport();

  const onTabClick = (key, event) => setActiveTab(key);

  const renderWithReportProps = React.useCallback(
    ({ reportProps }) => {
      setReportProps(reportProps);
      setEmbed(reportRef, {
        ...reportProps,
        settings: extraSettings,
      });
      setIsValidConfig(true);
    },
    [reportProps]
  );

  const onReset = React.useCallback(() => {
    setIsValidConfig(false);
  }, [isVaildConfig]);

  const extraSettings = {
    filterPaneEnabled: false,
    navContentPaneEnabled: false,
  };

  const handleclick = () => {
    // you can use "report" from useReport like
    if (report) report.print();
  };

  // !important: make sure we have reportRef
  React.useEffect(() => {
    if (isVaildConfig) {
      setEmbed(reportRef, {
        ...reportProps,
        settings: extraSettings,
      });
    }
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
            initalReportProps={initalReportProps}
            onSubmit={renderWithReportProps}
            onReset={onReset}
          />
        </TabPane>
        <TabPane
          tab={
            <Badge dot={isVaildConfig}>
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
              disabled={!isVaildConfig}
              type="primary"
              shape="round"
              onClick={handleclick}
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
              We show the report tab as default we ensure that the
              reportRef set. Currently demo is available for only
              embedType "report"
            </Text>
            <Button
              type="link"
              href="https://github.com/akshay5995/powerbi-report-component/blob/master/src/docs/UseReportDemo/index.jsx#L56"
              target="_blank"
            >
              Click here to see the code
            </Button>
          </Info>
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default UseReportDemo;
