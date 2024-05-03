import { useEffect, useState } from "react";
import "./Gallery.css";
import Slider from "react-slick";
function NextBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
    
  );
}

function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{
        zIndex:2
      }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}
const Gallery = ({singleProduct}) => {
  const [activeImg, setActiveImg] = useState(singleProduct.img[0]);

  useEffect(() => {
    setActiveImg(singleProduct.img[0]);
  }, [singleProduct.img]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`${activeImg}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
            <Slider {...settings}>
              {singleProduct.img.map((item, i) => (
                <div
                  key={i}
                  className="glide__slide glide__slide--active"
                  onClick={() => setActiveImg(item)}
                >
                  <img
                    src={`${item}`}
                    alt=""
                    className={`img-fluid ${
                      item === activeImg ? "active" : ""
                    } `}
                  />
                </div>
              ))}
            </Slider>
        </div>
        <div className="glide__arrows" data-glide-el="controls">

        </div>
      </div>
    </div>
  );
};

export default Gallery;
