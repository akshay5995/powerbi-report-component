import React from 'react';
import { Form, Button } from 'antd';
import { tailLayout, buttonStyle } from '../styles/formLayoutStyles';

const FormButtonGroupBootstrap = ({ isBootstrapped, isSubmit, onBootstrap, onReset, isLoading }) => (
  <Form.Item {...tailLayout}>
    <Button
      style={buttonStyle}
      disabled={isBootstrapped}
      type="primary"
      onClick={onBootstrap}
    >
      Bootstrap
    </Button>
    <Button
      style={buttonStyle}
      disabled={!isBootstrapped}
      loading={isLoading}
      type="secondary"
      htmlType="submit"
    >
      Embed
    </Button>
    <Button
      danger
      style={buttonStyle}
      disabled={!isSubmit || !isBootstrapped}
      onClick={onReset}
    >
      Reset
    </Button>
  </Form.Item>
);

export default FormButtonGroupBootstrap;
