import { Button, Table, message, Popconfirm, Space } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};
const SliderPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
  const columns = [
    {
      title: "İmage",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img src={imgSrc} alt="img" width={250} height={150} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button type="primary" onClick={()=>navigate(`/admin/slider/update/${record._id}`)} >
            Edit
          </Button>
          <Popconfirm
            title="Category Delete"
            description="Are you sure to delete this category?"
            onConfirm={() => deleteSlider(record._id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/slider`);

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        message.error("Login Failed!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  const deleteSlider = async (sliderId) => {
    try {
      const response = await fetch(`${apiUrl}/api/slider/${sliderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Slider Deleted Successfully.");
        fetchCategories();
      } else {
        message.error("Delete Failed!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <Table
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
    />
  );
};

export default SliderPage;
