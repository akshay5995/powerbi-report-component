import React from 'react';
import { Form, Input, Select } from 'antd';
import { layout } from '../styles/formLayoutStyles';
import FormButtonGroup from '../common/FormButtonGroup';

const DashboardForm = ({ onSubmit, initalDashboardProps, onReset }) => {
  const [isSubmit, setIsSubmit] = React.useState(false);

  const onSubmitForm = ({ dashboardProps }) => {
    setIsSubmit(true);
    onSubmit({ dashboardProps });
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
      name="dashboardProps"
      onFinish={onSubmitForm}
      initialValues={{ dashboardProps: initalDashboardProps }}
    >
      <Form.Item
        label="Token Type"
        name={['dashboardProps', 'tokenType']}
        rules={[{ required: true }]}
      >
        <Select placeholder="Token Type">
          <Select.Option value="Embed">Embed</Select.Option>
          <Select.Option value="Aad">Aad</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['dashboardProps', 'accessToken']}
        label="Token"
        rules={[{ required: true, message: 'Token is required' }]}
      >
        <Input placeholder="Embed or Aad Token" />
      </Form.Item>
      <Form.Item
        name={['dashboardProps', 'embedUrl']}
        label="Embed Url"
        rules={[{ required: true, message: 'Embed Url is required' }]}
      >
        <Input placeholder="Embed Url" />
      </Form.Item>
      <Form.Item
        name={['dashboardProps', 'embedId']}
        label="Embed Id"
        rules={[{ required: true, message: 'Embed Id is required' }]}
      >
        <Input placeholder="Embed Id" />
      </Form.Item>
      <Form.Item
        label="Page View"
        name={['dashboardProps', 'pageView']}
      >
        <Select placeholder="Page View (optional)">
          <Select.Option value="fitToWidth">fitToWidth</Select.Option>
          <Select.Option value="oneColumn">oneColumn</Select.Option>
          <Select.Option value="actualtSize">actualtSize</Select.Option>
        </Select>
      </Form.Item>
      <FormButtonGroup isSubmit={isSubmit} onReset={onResetForm} />
    </Form>
  );
};

export default DashboardForm;
