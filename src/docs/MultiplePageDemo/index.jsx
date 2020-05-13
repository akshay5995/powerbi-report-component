import React from 'react';
import { Layout, Tabs, Badge, Button, Typography, Alert } from 'antd';
import {
  FormOutlined,
  CheckCircleTwoTone,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Report } from '../../lib';
import Form from './Form';
import Info from '../common/InfoTab';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Text } = Typography;

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

  const reportMap = React.useRef(new Map());

  const setReportRefInMap = React.useCallback(
    (pageName) => (reportRef) => {
      reportMap.current.set(pageName, reportRef);
    },
    []
  );

  const setFilter = React.useCallback(
    (pageName) => {
      const reportRef = reportMap.current.get(pageName);

      const filter = {
        $schema: 'http://powerbi.com/product/schema#basic',
        target: {
          table: 'Geo',
          column: 'Region',
        },
        operator: 'In',
        values: ['West'],
      };

      setFilterForReportRef(reportRef, filter);
    },
    [reportMap]
  );

  const setFilterForReportRef = (reportRef, filter) =>
    reportRef
      .getPages()
      .then((pages) => {
        const activePage = pages.filter((page) => page.isActive)[0];
        activePage
          .setFilters([filter])
          .then(() => console.log('Page filter was set'))
          .catch((errors) => console.log(errors));
      })
      .catch((errors) => console.log(errors));

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

  const clearFilters = (pageName) => {
    const reportRef = reportMap.current.get(pageName);

    reportRef
      .getPages()
      .then((pages) => {
        const activePage = pages.filter((page) => page.isActive)[0];
        activePage
          .removeFilters()
          .then(() => console.log('Page filters were removed'))
          .catch((errors) => console.log(errors));
      })
      .catch((errors) => console.log(errors));
  };

  return (
    <>
      <Alert
        message="Filter actions only work for Microsoft's sample report. (Hardcoded)"
        description="If you're using microsoft's sample report you can try page names 'ReportSection600dd9293d71ade01765', 'ReportSectiona271643cba2213c935be'"
        type="warning"
        style={{ margin: '0 24px' }}
      />
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
            style={{ display: 'flex', flexFlow: 'column' }}
            key="report"
          >
            <div style={{ display: 'flex', margin: '8px 0' }}>
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <Text mark>{reportProps.pageName1}</Text>
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => setFilter(reportProps.pageName1)}
                >
                  Set Filter
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => clearFilters(reportProps.pageName1)}
                >
                  Clear Filter
                </Button>
              </div>
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'space-around',
                }}
              >
                <Text mark>{reportProps.pageName2}</Text>
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => setFilter(reportProps.pageName2)}
                >
                  Set Filter
                </Button>
                <Button
                  type="primary"
                  shape="round"
                  onClick={() => clearFilters(reportProps.pageName2)}
                >
                  Clear Filter
                </Button>
              </div>
            </div>
            <div style={{ display: 'flex', height: '100%' }}>
              {isVaildConfig && (
                <Report
                  style={{
                    height: '100%',
                    width: '50%',
                    border: '0',
                  }}
                  extraSettings={extraSettings}
                  {...reportProps}
                  pageName={reportProps.pageName1}
                  onLoad={setReportRefInMap(reportProps.pageName1)}
                  onSelectData={(data) => {
                    console.log('Data selected', data);
                  }}
                  onError={(data) => {
                    console.log('Error', data);
                  }}
                  onPageChange={(data) => {
                    console.log(data);
                  }}
                />
              )}
              {isVaildConfig && (
                <Report
                  style={{
                    height: '100%',
                    width: '50%',
                    border: '0',
                  }}
                  {...reportProps}
                  onLoad={setReportRefInMap(reportProps.pageName2)}
                  pageName={reportProps.pageName2}
                  extraSettings={extraSettings}
                  onSelectData={(data) => {
                    console.log('Data selected', data);
                  }}
                  onError={(data) => {
                    console.log('Error', data);
                  }}
                  onPageChange={(data) => {
                    console.log(data);
                  }}
                />
              )}
            </div>
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
            <Info
              title="Why the warning?"
              titleType="warning"
              key="info"
            >
              <Text>
                The filters are hardcoded for the purposes of this demo
                particular demo.
                <Button
                  type="link"
                  href="https://github.com/akshay5995/powerbi-report-component/blob/master/src/docs/MultiplePageDemo/index.jsx#L41"
                  target="_blank"
                >
                  Click here to see the code
                </Button>
              </Text>
            </Info>
          </TabPane>
        </Tabs>
      </Content>
    </>
  );
};

export default ReportDemo;
