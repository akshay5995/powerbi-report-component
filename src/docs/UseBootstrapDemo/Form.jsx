import React from 'react';
import { Form, Input, Select } from 'antd';
import { layout } from '../styles/formLayoutStyles';
import FormButtonGroupBootstrap from '../common/FormButtonGroupBootstrap';


const simulateAjaxCall = (reportProps) => new Promise(function(resolve, reject) {
  setTimeout(() => {
     console.log("Simulating!!!")
  }, 3000);
  resolve(reportProps);
});

const ReportForm = ({
  onSubmit,
  initialReportProps,
  onReset,
  onBootstrap,
}) => {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isSimulation, setIsSimulation] = React.useState(false);
  const [isBootstrapped, setIsBootstrapped] = React.useState(false);

  const handleBootstrap = () => {
    setIsBootstrapped(true);
    onBootstrap();
  };

  const onSubmitForm = ({ reportProps }) => {
    console.log("Simulating async embed call");
    setIsSimulation(true);
    simulateAjaxCall(reportProps).then(data => {
      setIsSubmit(true);
      onSubmit({ reportProps: data  });
      setIsSimulation(false);
    })
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
        hidden={!isBootstrapped}
        rules={[
          { required: isBootstrapped, message: 'Token is required' },
        ]}
      >
        <Input placeholder="Embed or Aad Token" />
      </Form.Item>
      <Form.Item
        name={['reportProps', 'embedUrl']}
        hidden={!isBootstrapped}
        label="Embed Url"
        rules={[
          {
            required: isBootstrapped,
            message: 'Embed Url is required',
          },
        ]}
      >
        <Input placeholder="Embed Url" />
      </Form.Item>
      <Form.Item
        name={['reportProps', 'embedId']}
        label="Embed Id"
        hidden={!isBootstrapped}
        rules={[
          {
            required: isBootstrapped,
            message: 'Embed Id is required',
          },
        ]}
      >
        <Input placeholder="Embed Id" />
      </Form.Item>
      <Form.Item
        label="Permissions"
        hidden={!isBootstrapped}
        name={['reportProps', 'permissions']}
      >
        <Select placeholder="Permissions (default: View)">
          <Select.Option value="View">View</Select.Option>
          <Select.Option value="All">All</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        hidden={!isBootstrapped}
        label="Mode"
        name={['reportProps', 'reportMode']}
      >
        <Select placeholder="Mode (default: View)">
          <Select.Option value="View">View</Select.Option>
          <Select.Option value="Edit">Edit</Select.Option>
        </Select>
      </Form.Item>
      <FormButtonGroupBootstrap
        isBootstrapped={isBootstrapped}
        isSubmit={isSubmit}
        onReset={onResetForm}
        onBootstrap={handleBootstrap}
        isLoading={isSimulation}
      />
    </Form>
  );
};

export default ReportForm;
