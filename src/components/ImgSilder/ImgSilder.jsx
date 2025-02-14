import React from 'react';
import Slider from "react-slick";

import image1 from '../../assets/slider-image-1.jpeg';
import image2 from '../../assets/slider-image-2.jpeg';
import image3 from '../../assets/slider-image-3.jpeg';
import image4 from '../../assets/blog-img-1.jpeg';
import image5 from '../../assets/blog-img-2.jpeg';

export default function ImgSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000, 
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="flex flex-col md:flex-row gap-4">
       
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            <img src={image1} alt="Slider 1" className="w-full h-[400px] object-cover rounded-lg" />
            <img src={image2} alt="Slider 2" className="w-full h-[400px] object-cover rounded-lg" />
            <img src={image3} alt="Slider 3" className="w-full h-[400px] object-cover rounded-lg" />
          </Slider>
        </div>

        
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          <img src={image4} alt="Blog 1" className="w-full h-[195px] md:h-[200px] object-cover rounded-lg shadow-md" />
          <img src={image5} alt="Blog 2" className="w-full h-[195px] md:h-[200px] object-cover rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
}
