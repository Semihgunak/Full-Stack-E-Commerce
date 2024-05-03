import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import {  useState } from "react";

const CreateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Coupon Created Successfully.");
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
          label="Coupon code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please input your code!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Coupon DiscountPercent"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Please input your DiscountPercent!",
            },
          ]}
        >
          <InputNumber  />
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

export default CreateCouponPage;
