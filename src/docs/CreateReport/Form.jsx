import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import { layout, tailLayout } from '../common/formLayoutStyles';

const ReportForm = ({ onSubmit, initalReportProps, onReset }) => {
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
      initialValues={{ reportProps: initalReportProps }}
    >
      <Form.Item
        label="Token Type"
        name={['reportProps', 'tokenType']}
        rules={[{ required: true }]}
      >
        <Select placeholder="Token Type" disabled={isSubmit}>
          <Select.Option value="Embed">Embed</Select.Option>
          <Select.Option value="Aad">Aad</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['reportProps', 'accessToken']}
        label="Token"
        rules={[{ required: true, message: 'Token is required' }]}
      >
        <Input placeholder="Embed or Aad Token" disabled={isSubmit}/>
      </Form.Item>
      <Form.Item
        name={['reportProps', 'embedUrl']}
        label="Embed Url"
        rules={[{ required: true, message: 'Embed Url is required' }]}
      >
        <Input placeholder="Embed Url" disabled={isSubmit}/>
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
