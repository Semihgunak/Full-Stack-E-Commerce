import "./BlogItem.css";
import { Link } from "react-router-dom";

const BlogItem = ({blog}) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const createReviewDate = new Date(blog.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  return (
    <li className="blog-item">
    <a href="#" className="blog-image">
      <img src={blog.img} alt="blog" width={200} height={250}/>
    </a>
    <div className="blog-info">
      <div className="blog-info-top">
        <span> {createReviewDate} </span>
        -
        <span> 0 Comments</span>
      </div>
      <div className="blog-info-center">
        <a href="#"> {blog.name} </a>
      </div>
      <div className="blog-info-bottom">
        <Link to={`${blog._id}`} >Read More</Link>
      </div>
    </div>
  </li>
  )
}

export default BlogItem
