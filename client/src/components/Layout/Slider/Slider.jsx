import { useEffect, useState } from "react";
import SliderItem from "./SliderItem";
import "./slider.css";

const Slider = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSliders = async () => {
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
      }
    };

    fetchSliders();
  }, [apiUrl]);

  return (
    <section className="slider">
      <div className="slider-elements">
        {dataSource.map(
          (data, i) => currentSlider === i && <SliderItem key={i} imageSrc={data.img} />
        )}
        <div className="slider-buttons">
          <button
            onClick={() =>
              setCurrentSlider(currentSlider <= 0 ? 2 : currentSlider - 1)
            }
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            onClick={() =>
              setCurrentSlider(currentSlider > 1 ? 0 : currentSlider + 1)
            }
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="slider-dots">
          <button
            className={`slider-dot ${currentSlider === 0 ? "active" : ""}`}
            onClick={() => setCurrentSlider(0)}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlider === 1 ? "active" : ""}`}
            onClick={() => setCurrentSlider(1)}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlider === 2 ? "active" : ""}`}
            onClick={() => setCurrentSlider(2)}
          >
            <span></span>
          </button>

        </div>
      </div>
    </section>
  );
};

export default Slider;
