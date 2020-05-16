import React from 'react';
import { Form, Button } from 'antd';
import { tailLayout, buttonStyle } from '../styles/formLayoutStyles';

const FormButtonGroup = ({ isSubmit, onReset }) => (
  <Form.Item {...tailLayout}>
    <Button
      style={buttonStyle}
      disabled={isSubmit}
      type="primary"
      htmlType="submit"
    >
      Embed
    </Button>
    <Button
      danger
      style={buttonStyle}
      disabled={!isSubmit}
      onClick={onReset}
    >
      Reset
    </Button>
  </Form.Item>
);

export default FormButtonGroup;
