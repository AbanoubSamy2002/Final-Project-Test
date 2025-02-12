import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PopularCategories() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 7, 
    slidesToScroll: 7,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      }
    ]

  };

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Slider className="my-9 text-" {...settings}>
        {categories.map((category) => (
          <div key={category._id}>
            <img
              src={category.image}
              alt={category.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <p style={{ textAlign: "center" }}>{category.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
