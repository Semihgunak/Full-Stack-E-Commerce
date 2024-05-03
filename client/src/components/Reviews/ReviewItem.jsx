const ReviewItem = ({ reviewItem }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const createReviewDate = new Date(reviewItem.review.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src={reviewItem.user.avatar} width={60} height={60} alt="" />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          <li>
            <i
              className={`bi bi-star-${reviewItem.review.rating >= 1 ? "fill" : ""}`}
            ></i>
          </li>
          <li>
            <i
              className={`bi bi-star-${reviewItem.review.rating >= 2 ? "fill" : ""}`}
            ></i>
          </li>
          <li>
            <i
              className={`bi bi-star-${reviewItem.review.rating >= 3 ? "fill" : ""}`}
            ></i>
          </li>
          <li>
            <i
              className={`bi bi-star-${reviewItem.review.rating >= 4 ? "fill" : ""}`}
            ></i>
          </li>
          <li>
            <i
              className={`bi bi-star-${reviewItem.review.rating === 5 ? "fill" : ""}`}
            ></i>
          </li>
        </ul>
        <div className="comment-meta">
          <strong>{reviewItem.user.username.toUpperCase()}</strong>
          <span> - </span>
          <time>{createReviewDate}</time>
        </div>
        <div className="comment-description">
          <p>{reviewItem.review.text}</p>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
