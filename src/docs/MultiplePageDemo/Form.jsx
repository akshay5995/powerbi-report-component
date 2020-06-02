import React from 'react';
import { Form, Input, Select } from 'antd';
import { layout } from '../styles/formLayoutStyles';
import FormButtonGroup from '../common/FormButtonGroup';

const ReportForm = ({ onSubmit, initialReportProps, onReset }) => {
  const [isSubmit, setIsSubmit] = React.useState(false);

  const onSubmitForm = ({ reportProps }) => {
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
      title="Multiple page demo"
      name="reportProps"
      onFinish={onSubmitForm}
      initialValues={{ reportProps: initialReportProps }}
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
        name={['reportProps', 'pageName1']}
        label="Page Name 1"
        rules={[
          {
            required: true,
            message: 'Page Name 1 is required',
          },
        ]}
      >
        <Input placeholder="Page Name 1" />
      </Form.Item>
      <Form.Item
        name={['reportProps', 'pageName2']}
        label="Page Name 2"
        rules={[
          {
            required: true,
            message: 'Page Name 2 is required',
          },
        ]}
      >
        <Input placeholder="Page Name 2" />
      </Form.Item>
      <FormButtonGroup isSubmit={isSubmit} onReset={onResetForm} />
    </Form>
  );
};

export default ReportForm;
