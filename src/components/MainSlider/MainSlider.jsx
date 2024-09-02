import React from "react";
import style from "./MainSlider.module.css";
import slider1 from "../../../finalProject_assets/images/slider-image-1.jpeg";
import slider2 from "../../../finalProject_assets/images/slider-image-2.jpeg";
import slider3 from "../../../finalProject_assets/images/slider-image-3.jpeg";
import slider4 from "../../../finalProject_assets/images/grocery-banner.png";
import slider5 from "../../../finalProject_assets/images/grocery-banner-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <>
      <div className="row my-5">
        <div className="md:w-3/4 w-full">
          <Slider {...settings}>
            <img
              src={slider3}
              className="w-full h-[400px]  object-cover"
              alt=""
            />
            <img
              src={slider4}
              className="w-full h-[400px]  object-cover"
              alt=""
            />
            <img
              src={slider5}
              className="w-full h-[400px]  object-cover"
              alt=""
            />
          </Slider>
        </div>
        <div className="w-0 md:w-1/4 ">
          <img src={slider2} className="w-full h-[200px] object-cover" alt="" />
          <img src={slider3} className="w-full h-[200px] object-cover" alt="" />
        </div>
      </div>
    </>
  );
}
