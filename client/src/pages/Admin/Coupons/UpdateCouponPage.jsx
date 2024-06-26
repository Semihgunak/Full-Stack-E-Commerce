import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCouponPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id;
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Coupon Updated Successfully.");
        navigate("/admin/coupons");
      } else {
        message.error("Updated Failed.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleCoupon = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

        if (!response.ok) {
          throw new Error("verileri getirme hatası");
        }
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleCoupon();
  }, [apiUrl, couponId, form]);

  return (
    <Spin spinning={loading} >
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
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
              message: "Please input your discountPercent!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UpdateCouponPage;
