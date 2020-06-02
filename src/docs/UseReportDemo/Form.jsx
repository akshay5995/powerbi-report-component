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
      name="reportProps"
      onFinish={onSubmitForm}
      initialValues={{ reportProps: initialReportProps }}
    >
      <Form.Item
        label="Embed Type"
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
      <FormButtonGroup isSubmit={isSubmit} onReset={onResetForm} />
    </Form>
  );
};

export default ReportForm;
