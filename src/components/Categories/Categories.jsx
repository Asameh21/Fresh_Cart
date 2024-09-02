import React, { useContext, useEffect, useState } from "react";
import style from "./Categories.module.css";
import { CategoriesContext } from "../../Context/CategoriesContext";
import { Link } from "react-router-dom";

export default function Categories() {
  const [data, setdata] = useState([]);
  const [subData, setsubData] = useState([]);
  const [loading, setloading] = useState(false);
  const [loaded, setloaded] = useState(false);

  const [currentId, setcurrentId] = useState(0);
  let { getAllCategories, getSubCategories } = useContext(CategoriesContext);

  async function getCategories() {
    let response = await getAllCategories();
    setdata(response.data.data);
  }

  async function getsubCategory(id) {
    setloading(true);
    let response = await getSubCategories(id);

    setsubData(response.data.data);
    setloading(false);
    setloaded(true);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {data?.length > 0 ? (
        <div className="row relative">
          <>
            {data?.map((product) => (
              <div
                className="w-full xs:w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5  "
                key={product._id}
              >
                <div className="p-2">
                  <div
                    onClick={() => {
                      setcurrentId(product._id);
                      getsubCategory(product._id);
                    }}
                    className="product shadow-xl rounded-xl cursor-pointer p-3 my-2 hover:shadow-emerald-500 duration-500  "
                  >
                    <img
                      src={product.image}
                      className="w-full h-[240px] object-cover rounded-xl"
                      alt=""
                    />
                    <h3 className="my-2 font-semibold  ">{product.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </>
          {subData.length > 0 ? (
            <h1 className="text-center absolute -bottom-14 left-[50%] translate-x-[-50%] text-emerald-500 m-auto mt-10 text-2xl font-semibold">
              {data.find((p) => p._id === currentId)?.name} subcategories:
            </h1>
          ) : null}
        </div>
      ) : (
        <div className="absolute top-0 left-0 right-0 bottom-0  bg-[#ffffff90] flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
      <div className="row mt-16">
        {loading ? (
          <div className="fixed top-0 left-0 right-0 bottom-0  bg-[#ffffff90] flex items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : subData?.length > 0 ? (
          subData?.map((sub) => (
            <div
              key={sub._id}
              className="w-full sm:w-full md:w-1/2 xl:w-1/3 p-2"
            >
              <div className=" border-2 cursor-pointer rounded-xl hover:bg-slate-500 hover:text-white duration-500 text-xl font-semibold border-slate-500 p-10">
                {sub.name}
              </div>
            </div>
          ))
        ) : loaded ? (
          <h1 className="text-3xl font-bold bg-red-600 rounded-xl p-4 text-white capitalize m-auto  text-center my-8">
            There are no sub categories from this category
          </h1>
        ) : null}
      </div>
    </>
  );
}
