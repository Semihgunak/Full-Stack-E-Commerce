import { Button, Form, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";


const UpdateBlogPage = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [form] = Form.useForm();
  const params = useParams();
  const blogId = params.id;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/blogs/${blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Blog Updated Successfully.");
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
    const fetchSingleBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/blogs/${blogId}`);

        if (!response.ok) {
          throw new Error("verileri getirme hatası");
        }
        const data = await response.json();
        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
            blogpost: data.blogpost,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleBlogs();
  }, [apiUrl, blogId, form]);

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
          label="Blog İmage"
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

        <Form.Item
          label="Blog Name"
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
          label="Blogpost"
          name="blogpost"
          rules={[
            {
              required: true,
              message: "Please input your blogpost!",
            },
          ]}
        >
          <ReactQuill theme="snow" style={{ backgroundColor: "white" }} />
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

export default UpdateBlogPage;
