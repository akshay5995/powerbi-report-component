import React from 'react';
import { Typography, Tabs } from 'antd';

const { Title } = Typography;

const Info = ({ title, titleType, children }) => {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={4} type={titleType}>
        {title}
      </Title>
      {children}
    </div>
  );
};

export default Info;
