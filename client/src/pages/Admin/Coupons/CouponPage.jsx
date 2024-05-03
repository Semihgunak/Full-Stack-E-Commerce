import { Button, Table, message, Popconfirm, Space } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};
const CouponPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    
    },
    {
      title: "DiscountPercent",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text)=> <span>%{text}</span>
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button type="primary" onClick={()=>navigate(`/admin/coupons/update/${record._id}`)} >
            Edit
          </Button>
          <Popconfirm
            title="Category Delete"
            description="Are you sure to delete this category?"
            onConfirm={() => deleteCoupon(record._id)}
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

  const fetchCoupon = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/coupons`);

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

  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Coupon Deleted Successfully.");
        fetchCoupon();
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
    fetchCoupon();
  }, [fetchCoupon]);
  return (
    <Table
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
    />
  );
};

export default CouponPage;
