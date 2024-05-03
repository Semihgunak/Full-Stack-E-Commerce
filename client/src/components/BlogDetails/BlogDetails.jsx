import Reviews from "../Reviews/Reviews";
import "./BlogDetails.css";

const BlogDetails = ({singleBlog}) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const createReviewDate = new Date(singleBlog.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  
  return (
    <section className="single-blog">
      <div className="container">
        <article>
          <figure>
            <a href="#">
              <img src={singleBlog.img} alt="" />
            </a>
          </figure>
          <div className="blog-wrapper">
            <div className="blog-meta">
              <div className="blog-category">
                <a href="#">COLLECTION</a>
              </div>
              <div className="blog-date">
                <a href="#"> {createReviewDate} </a>
              </div>
              <div className="blog-tags">
                <a href="#">products</a>,<a href="#">coats</a>
              </div>
            </div>
            <h1 className="blog-title"> {singleBlog.name} </h1>
            <div className="blog-content">
              <p dangerouslySetInnerHTML={{ __html: singleBlog.blogpost }} >
                
              </p>
            
            </div>
          </div>
        </article>
        <Reviews />
      </div>
    </section>
  );
};

export default BlogDetails;