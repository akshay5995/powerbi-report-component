import React from 'react';
import { Breadcrumb, Switch, Typography, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Header = ({ title, setDarkMode, isDarkMode }) => {
  const onChange = (checked) => setDarkMode(checked);

  const genereateImportStatement = () => {
    let importComponent = title === 'Create Report' ? 'Report' : title;
    return `import { ${importComponent} } from 'powerbi-report-component';`;
  };

  return (
    <div className="site-layout-header">
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
          <Text strong>Embed Type</Text>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Text strong copyable={{ text: genereateImportStatement() }}>
            {title}
          </Text>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Space>
      <Text strong>Dark Mode</Text>
      <Switch
        checked={isDarkMode}
        onChange={onChange}
      />
      </Space>
    </div>
  );
};
export default Header;
