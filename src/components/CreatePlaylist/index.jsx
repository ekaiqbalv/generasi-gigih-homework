import React from 'react';
import {
  Typography, Form, Input, Button,
} from 'antd';
import './style.css';

const CreatePlaylist = ({ handleSubmitFormCreatePlaylist }) => {
  const [form] = Form.useForm();

  return (
    <div className="create-playlist">
      <Typography.Title level={3}>Create Playlist</Typography.Title>
      <Form
        layout="vertical"
        form={form}
        onFinish={() => handleSubmitFormCreatePlaylist(form)}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, min: 10 }]}
        >
          <Input placeholder="Add a title" allowClear />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, min: 20 }]}
        >
          <Input.TextArea
            placeholder="Add a description"
            autoSize={{ minRows: 2, maxRows: 6 }}
            showCount
            allowClear
          />
        </Form.Item>
        <Button htmlType="submit" type="primary" block>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreatePlaylist;
