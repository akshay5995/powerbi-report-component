import React from 'react';
import { Form, Input, Select } from 'antd';
import { layout } from '../styles/formLayoutStyles';
import FormButtonGroup from '../common/FormButtonGroup';

const ReportForm = ({ onSubmit, initialReportProps, onReset }) => {
  const [isSubmit, setIsSubmit] = React.useState(false);

  const onSubmitForm = ({ reportVisualProps }) => {
    setIsSubmit(true);
    onSubmit({ reportVisualProps });
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
      name="reportVisualProps"
      onFinish={onSubmitForm}
      initialValues={{ reportVisualProps: initialReportProps }}
    >
      <Form.Item
        label="Token Type"
        name={['reportVisualProps', 'tokenType']}
        rules={[{ required: true }]}
      >
        <Select placeholder="Token Type">
          <Select.Option value="Embed">Embed</Select.Option>
          <Select.Option value="Aad">Aad</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['reportVisualProps', 'accessToken']}
        label="Token"
        rules={[{ required: true, message: 'Token is required' }]}
      >
        <Input placeholder="Embed or Aad Token" />
      </Form.Item>
      <Form.Item
        name={['reportVisualProps', 'embedUrl']}
        label="Embed Url"
        rules={[{ required: true, message: 'Embed Url is required' }]}
      >
        <Input placeholder="Embed Url" />
      </Form.Item>
      <Form.Item
        name={['reportVisualProps', 'embedId']}
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
      <Form.Item
        name={['reportVisualProps', 'pageName']}
        label="Page Name"
        rules={[
          {
            required: true,
            message: 'Page name is required',
          },
        ]}
      >
        <Input placeholder="Page Name" />
      </Form.Item>
      <Form.Item
        name={['reportVisualProps', 'visualName']}
        label="Visual Name"
        rules={[
          {
            required: true,
            message: 'Visual name is required',
          },
        ]}
      >
        <Input placeholder="Visual Name" />
      </Form.Item>
      <FormButtonGroup isSubmit={isSubmit} onReset={onResetForm} />
    </Form>
  );
};

export default ReportForm;
