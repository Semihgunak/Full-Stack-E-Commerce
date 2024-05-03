import { Button, Form, Input, Spin, message } from "antd";
import {  useState } from "react";

const CreateSliderPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/slider/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Slider Created Successfully.");
        form.resetFields();
      } else {
        message.error("Created Failed.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} >
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Slider Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slider İmage"
          name="img"
          rules={[
            {
              required: true,
              message: "Please input your İmage!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CreateSliderPage;
