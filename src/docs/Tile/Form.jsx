import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 18,
  },
};

const TileForm = ({ onSubmit, initalTileProps }) => {
  return (
    <Form
      {...layout}
      size="large"
      colon={false}
      name="tileProps"
      onFinish={onSubmit}
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
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Embed Tile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TileForm;
