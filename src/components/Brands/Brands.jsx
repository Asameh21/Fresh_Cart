import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Brands() {
  const [data, setdata] = useState([]);
  function getAllBrands() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => setdata(res.data.data))
      .catch((err) => err);
  }
  useEffect(() => {
    getAllBrands();
  }, []);
  function feire(title, imga) {
    Swal.fire({
      title: `<h2 class="text-emerald-500">${title}<h2>`,
      html: `<img src="${imga}" alt="Brand Image" style="width: 100%;"/>`, // Use a string with the HTML image element
      confirmButtonText: 'Cancel', // Set your custom button text here

      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
      customClass: {
        confirmButton: "bg-slate-500 border-0 outline-0 ", // Reference your custom class here
      },
    });
  }

  return (
    <>
      {data.length > 0 ? (
        <div className="row">
          <>
            {data?.map((product) => (
              <div
                className="w-full xs:w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5  p-1"
                key={product._id}
              >
                <div
                  onClick={() => feire(product.name, product.image)}
                  className="product border-2 border-[#fff] cursor-pointer transition-all duration-500 box-border hover:border-emerald-500 shadow-lg rounded-lg hover:shadow-emerald-300  p-10  "
                >
                  <img src={product.image} className="w-full " alt="" />
                  <h3 className="my-2 font-semibold ">{product.name}</h3>
                </div>
              </div>
            ))}
          </>
        </div>
      ) : (
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-[#ffffff90] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
