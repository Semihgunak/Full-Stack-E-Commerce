import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const Success = () => {
  const { setCartItems } = useContext(CartContext);

  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Payment Successful!"
          subTitle="Your order was successfully completed."
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Home</Button>
            </Link>,

            <a href="/admin/orders" key={"order"}>
              <Button key="buy">My Orders</Button>
            </a>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
