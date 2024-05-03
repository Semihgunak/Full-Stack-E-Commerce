import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import "./Reviews.css";
import { message } from "antd";

const Reviews = ({ active, singleProduct, setSingleProduct }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);
  const thisReview = []
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          message.error("Login Failed!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  singleProduct && singleProduct.reviews.forEach((review)=>{
    const matchingUsers = users?.filter((user)=>user._id===review.user)

    matchingUsers.forEach((matchingUser)=>{
      thisReview.push(({
        review: review,
        user: matchingUser,
      }))
    })
  })

  return (
    <div className={`tab-panel-reviews ${active}`}>
      {singleProduct && singleProduct.reviews.length > 0 ? (
        <>
          <h3>2 reviews for {singleProduct.name}</h3>
          <div className="comments">
            <ol className="comment-list">
              {thisReview.map((item, i) => (
                <ReviewItem key={i} item={item} reviewItem={item} />
              ))}
            </ol>
          </div>
        </>
      ) : (
        <h3>Hiç yorum yok</h3>
      )}
      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm
          singleProduct={singleProduct}
          setSingleProduct={setSingleProduct}
        />
      </div>
    </div>
  );
};

export default Reviews;
