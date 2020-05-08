import React from 'react';
import { Layout, Typography } from 'antd';
import { HeartTwoTone, GithubFilled } from '@ant-design/icons';

const { Footer: StyledFooter } = Layout;
const { Text } = Typography;

const Footer = () => (
  <StyledFooter className="footer">
    <a href="https://github.com/akshay5995/powerbi-report-component">
      <GithubFilled style={{ fontSize: '24px' }} />
    </a>
    <Text strong>
      {'Made with '}
      <HeartTwoTone twoToneColor="#ff4d4f" />
      {' by '}
      <a href="https://github.com/akshay5995">@akshay5995</a>
    </Text>
  </StyledFooter>
);

export default Footer;
