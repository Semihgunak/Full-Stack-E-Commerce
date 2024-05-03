import { message } from "antd";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const { cartItems, setCartItems } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      message.info("null value cannot be entered");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (response.ok) {
        const data = await response.json();
        const discountPercent = data.discountPercent;

        const updatedCartItems = cartItems.map((item) => {
          const updatePrice = item.price * (1 - discountPercent / 100);
          return { ...item, price: updatePrice };
        });
        setCartItems(updatedCartItems);
        message.success("Coupon applied successfully ");
      } else {
        message.warning("Coupon not defined");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
          type="text"
          className="input-text"
          placeholder="Coupon code"
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn">Update Cart</button>
      </div>
    </div>
  );
};

export default CartCoupon;
