import React from 'react';
import { Form, Input, Select } from 'antd';
import { layout } from '../styles/formLayoutStyles';
import FormButtonGroup from '../common/FormButtonGroup';

const TileForm = ({ onSubmit, initalTileProps, onReset }) => {
  const [isSubmit, setIsSubmit] = React.useState(false);

  const onSubmitForm = ({ tileProps }) => {
    setIsSubmit(true);
    onSubmit({ tileProps });
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
      name="tileProps"
      onFinish={onSubmitForm}
      initialValues={{ tileProps: initalTileProps }}
    >
      <Form.Item
        label="Token Type"
        name={['tileProps', 'tokenType']}
        rules={[{ required: true }]}
      >
        <Select placeholder="Token Type">
          <Select.Option value="Embed">Embed</Select.Option>
          <Select.Option value="Aad">Aad</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={['tileProps', 'accessToken']}
        label="Token"
        rules={[{ required: true, message: 'Token is required' }]}
      >
        <Input placeholder="Embed or Aad Token" />
      </Form.Item>
      <Form.Item
        name={['tileProps', 'embedUrl']}
        label="Embed Url"
        rules={[{ required: true, message: 'Embed Url is required' }]}
      >
        <Input placeholder="Embed Url" />
      </Form.Item>
      <Form.Item
        name={['tileProps', 'dashboardId']}
        label="Dashboard Id"
        rules={[
          { required: true, message: 'Dashboard Id is required' },
        ]}
      >
        <Input placeholder="Dasboard Id" />
      </Form.Item>
      <Form.Item
        name={['tileProps', 'embedId']}
        label="Embed Id"
        rules={[{ required: true, message: 'Embed Id is required' }]}
      >
        <Input placeholder="Embed Id" />
      </Form.Item>
      <FormButtonGroup isSubmit={isSubmit} onReset={onResetForm} />
    </Form>
  );
};

export default TileForm;
