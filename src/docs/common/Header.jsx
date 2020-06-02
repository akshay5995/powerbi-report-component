import React from 'react';
import { Breadcrumb, Switch, Typography, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const titleImportMap = {
  'Create Report': 'Report',
  'Multiple Pages': 'Report',
  Report: 'Report',
  Dashboard: 'Dashboard',
  Tile: 'Tile',
  useReport: 'useReport',
};

const embedTypes = new Set(['Report', 'Dashboard', 'Tile']);

const Header = ({ title, setDarkMode, isDarkMode }) => {
  const onChange = (checked) => setDarkMode(checked);

  const generateImportStatement = () => {
    const importComponent = titleImportMap[title];
    return `import { ${importComponent} } from 'powerbi-report-component';`;
  };

  return (
    <div className="site-layout-header">
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
          {embedTypes.has(title) && <Text strong>Embed Type</Text>}
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Text strong copyable={{ text: generateImportStatement() }}>
            {title}
          </Text>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Space>
        <Text strong>Dark Mode</Text>
        <Switch checked={isDarkMode} onChange={onChange} />
      </Space>
    </div>
  );
};
export default Header;
