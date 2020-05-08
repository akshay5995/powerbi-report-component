import React from 'react';
import { Form, Input, Button, Select, Switch } from 'antd';

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 18,
  },
};

const ReportForm = ({ onSubmit, initalReportProps }) => {
  return (
    <Form
      {...layout}
      size="large"
      colon={false}
      name="reportProps"
      onFinish={onSubmit}
      initialValues={{ reportProps: initalReportProps }}
    >
      <Form.Item
        label="Token Type"
        name={['reportProps', 'tokenType']}
        rules={[{ required: true }]}
      >
        <Select placeholder="Token Type">
          <Select.Option value="Embed">Embed</Select.Option>
          <Select.Option value="Aad">Aad</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['reportProps', 'accessToken']}
        label="Token"
        rules={[{ required: true, message: 'Token is required' }]}
      >
        <Input placeholder="Embed or Aad Token" />
      </Form.Item>
      <Form.Item
        name={['reportProps', 'embedUrl']}
        label="Embed Url"
        rules={[{ required: true, message: 'Embed Url is required' }]}
      >
        <Input placeholder="Embed Url" />
      </Form.Item>
      <Form.Item label="Mode" name={['reportProps', 'reportMode']}>
        <Select placeholder="Mode (Create)">
          <Select.Option value="create">Create</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['reportProps', 'datasetId']}
        rules={[
          {
            required: true,
            message: 'Dataset ID is required for create report mode',
          },
        ]}
        label="Dataset Id"
      >
        <Input placeholder="Dataset Id" />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Embed Report
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReportForm;
