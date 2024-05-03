import { Button, Table, message, Popconfirm, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const cancel = (e) => {
  console.log(e);
  message.error("Click on No");
};
const ProductPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "İmage",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img src={imgSrc[0]} alt="img" width={100} height={100} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span> {text.current.toFixed(2)} </span>,
    },
    {
      title: "Discount",
      dataIndex: "price",
      key: "price",
      render: (text) => <span> %{text.discount} </span>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Colors",
      dataIndex: "colors",
      key: "colors",
      render: (text) => <span>{text + " "}</span>,
    },
    {
      title: "Sizes",
      dataIndex: "sizes",
      key: "sizes",
      render: (text) => <span>{text + " "}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space size={"middle"}>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Category Delete"
            description="Are you sure to delete this category?"
            onConfirm={() => deleteProduct(record._id)}
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

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Product Deleted Successfully.");
        // fetchProducts();
        setDataSource((prevProducts) => {
          return prevProducts.filter((product) => product._id !== productId);
        });
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
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products`),
        ]);
        if (!categoriesResponse || !productsResponse.ok) {
          message.error("Data Failed!");
        }
        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);

        const productWithCategories = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );
          return {
            ...product,
            categoryName: category ? category.name : "",
          };
        });

        setDataSource(productWithCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiUrl]);
  return (
    <Table
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
    />
  );
};

export default ProductPage;
