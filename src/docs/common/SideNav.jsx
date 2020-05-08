import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  BuildTwoTone,
  PieChartTwoTone,
  FundTwoTone,
  EditTwoTone,
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title } = Typography;

const SideNav = ({ darkMode, selected, onSelect }) => {
  const theme = darkMode ? 'dark' : 'light';

  const onClick = ({ key }) => onSelect(key);

  return (
    <Sider theme={theme} breakpoint="lg" collapsedWidth="0">
      <Title
        className={`title-${theme}`}
        level={4}
        copyable={{ text: 'npm i powerbi-report-component' }}
      >
        PowerBi Report Component
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
          key="Create Report"
          icon={<EditTwoTone style={{ fontSize: '18px' }} />}
        >
          Create Report
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideNav;
