import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { layout, tailLayout } from '../common/formLayoutStyles';

const ReportForm = ({ onSubmit, initalReportProps }) => {
  const onResetForm = () => {
    window.location.reload();
  };

  const [isSubmit, setIsSubmit] = React.useState(false);

  const onSumitForm = ({ reportProps }) => {
    setIsSubmit(true);
    onSubmit({ reportProps });
  };

  return (
    <Form
      {...layout}
      size="large"
      colon={false}
      name="reportProps"
      onFinish={onSumitForm}
      initialValues={{ reportProps: initalReportProps }}
    >
      <Form.Item
        label="Token Type"
        name={['reportProps', 'embedType']}
        rules={[{ required: true }]}
      >
        <Select placeholder="Embed Type">
          <Select.Option value="report">Report</Select.Option>
        </Select>
      </Form.Item>
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
      <Form.Item
        name={['reportProps', 'embedId']}
        label="Embed Id"
        rules={[
          {
            required: true,
            message: 'Embed Id is required',
          },
        ]}
      >
        <Input placeholder="Embed Id" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button disabled={isSubmit} type="primary" htmlType="submit">
          Embed
        </Button>
        <Button danger disabled={!isSubmit} onClick={onResetForm}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReportForm;
