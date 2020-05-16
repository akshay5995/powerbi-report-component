import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { layout, tailLayout } from '../common/formLayoutStyles';

const ReportForm = ({ onSubmit, initalReportProps, onReset }) => {
  const [isSubmit, setIsSubmit] = React.useState(false);

  const onSumitForm = ({ reportProps }) => {
    setIsSubmit(true);
    onSubmit({ reportProps });
  };

  const onResetForm = () => {
    setIsSubmit(false);
    onReset(false);
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
      <Form.Item label="Mode" name={['reportProps', 'reportMode']}>
        <Select placeholder="Mode (default: View)">
          <Select.Option value="view">View</Select.Option>
          <Select.Option value="edit">Edit</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Permissions"
        name={['reportProps', 'permissions']}
      >
        <Select placeholder="Permissions (default: View)">
          <Select.Option value="View">View</Select.Option>
          <Select.Option value="All">All</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name={['reportProps', 'datasetId']} label="Dataset Id">
        <Input placeholder="Dataset Id (opional)" />
      </Form.Item>
      <Form.Item name={['reportProps', 'pageName']} label="Page Name">
        <Input placeholder="Page Name (optional)" />
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
