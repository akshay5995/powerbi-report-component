import React from 'react';
import { Layout, Tabs, Badge, Button, Alert, Typography } from 'antd';
import {
  FormOutlined,
  CheckCircleTwoTone,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useBootstrap } from '../../../lib';
import Form from './Form';
import Info from '../common/InfoTab';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Text } = Typography;

const extraSettings = {
  filterPaneEnabled: false,
  navContentPaneEnabled: false,
};

const initialReportProps = {
  embedType: 'report',
  tokenType: 'Embed',
  extraSettings,
};

const UseBootstrapDemo = () => {
  const [reportProps, setReportProps] =
    React.useState(initialReportProps);
  const [isValidConfig, setIsValidConfig] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('report');

  const reportRef = React.useRef(null);
  const [report, bootstrap, embed] = useBootstrap();

  const onTabClick = (key, event) => setActiveTab(key);

  const renderWithReportProps = ({ reportProps }) => {
    setReportProps(reportProps);
    embed(reportRef, {
      ...reportProps,
      extraSettings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false,
      },
    });
    setIsValidConfig(true);
  };

  const bootstrapReport = () => {
    bootstrap(reportRef, initialReportProps);
  };

  const onReset = React.useCallback(() => {
    setIsValidConfig(false);
  }, [isValidConfig]);

  const handleClick = () => {
    // you can use "report" from useReport like
    if (report) report.print();
  };

  const renderInfo = () => (
    <ol>
      <li>Click on <b>Bootstarp</b></li>
      <li>Check the <b>Report</b> tab (you should see a loading screen)</li>
      <li>Input rest of the required configuration</li>
      <li>
        Click on <b>Embed</b> to simulate a async call to get the configuration
        and embed your report
      </li>
    </ol>
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
          <Alert
            message="Bootstrapping helps you improve performance"
            description={renderInfo()}
            type="info"
            closable
          />
          <Form
            initialReportProps={initialReportProps}
            onSubmit={renderWithReportProps}
            onReset={onReset}
            onBootstrap={bootstrapReport}
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
              href="https://github.com/akshay5995/powerbi-report-component/blob/master/src/docs/UseBootstrapDemo/index.jsx"
              target="_blank"
            >
              see the code
            </Button>
          </Info>
          <Info title="Read more about bootstrap" key="info1">
            <Text>
              Bootstrap helps you improve performance by loading report
              with incomplete configuration and the load the rest of the
              report when you get the configuration in an <b>async</b> way.
            </Text>
          </Info>
          <Button
            type="link"
            href="https://docs.microsoft.com/en-us/javascript/api/overview/powerbi/bootstrap-better-performance"
            target="_blank"
          >
            Read more about bootstrap feature
          </Button>
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

export default UseBootstrapDemo;
