import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  BuildTwoTone,
  PieChartTwoTone,
  FundTwoTone,
  EditTwoTone,
  CopyTwoTone,
  LinkOutlined,
  ExperimentTwoTone,
  ContainerTwoTone,
  HourglassTwoTone
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title } = Typography;

const SideNav = ({ darkMode, selected, onSelect }) => {
  const theme = darkMode ? 'dark' : 'light';

  const onClick = ({ key }) => {
    if (key !== '_msDemoLink') onSelect(key);
  };

  return (
    <Sider theme={theme} breakpoint="lg" collapsedWidth="0">
      <Title
        className={`title-${theme}`}
        level={4}
        copyable={{ text: 'npm i powerbi-report-component' }}
      >
        PowerBI Report Component
      </Title>
      <Menu
        theme={theme}
        mode="inline"
        selectedKeys={[selected]}
        onClick={onClick}
      >
        <Menu.Item
          key="Report"
          icon={<PieChartTwoTone style={{ fontSize: '18px' }} />}
        >
          Report
        </Menu.Item>
        <Menu.Item
          key="Dashboard"
          icon={<FundTwoTone style={{ fontSize: '18px' }} />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="Tile"
          icon={<BuildTwoTone style={{ fontSize: '18px' }} />}
        >
          Tile
        </Menu.Item>
        <Menu.Item
          key="ReportVisual"
          icon={<ContainerTwoTone style={{ fontSize: '18px' }} />}
        >
          ReportVisual
        </Menu.Item>
        <Menu.Item
          key="Create Report"
          icon={<EditTwoTone style={{ fontSize: '18px' }} />}
        >
          Create Report
        </Menu.Item>
        <Menu.Item
          key="Multiple Pages"
          icon={<CopyTwoTone style={{ fontSize: '18px' }} />}
        >
          Multiple Pages
        </Menu.Item>
        <Menu.Item
          key="useReport"
          icon={<ExperimentTwoTone style={{ fontSize: '18px' }} />}
        >
          useReport
        </Menu.Item>
        <Menu.Item
          key="useBootstrap"
          icon={<HourglassTwoTone style={{ fontSize: '18px' }} />}
        >
          useBootstrap
        </Menu.Item>
        <Menu.Item key="_msDemoLink" icon={<LinkOutlined />}>
          <a
            href="https://microsoft.github.io/PowerBI-JavaScript/demo/v2-demo/index.html#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft's demo
          </a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideNav;
