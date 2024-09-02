import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [Categories, setCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => setCategories(data.data))
      .catch((res) => res);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h2 className="my-3 capitalize font-semibold text-gray-600 text-start">
        Shop popular categories
      </h2>
      {Categories.length > 0 ? (
        <Slider {...settings}>
          {Categories.map((category) => (
            <div key={category._id}>
              <img
                src={category.image}
                className="w-full h-[200px] object-cover"
                alt={category.name}
              />
              <h4>{category.name}</h4>
            </div>
          ))}
        </Slider>
      ) : (
        ""
      )}
    </>
  );
}
